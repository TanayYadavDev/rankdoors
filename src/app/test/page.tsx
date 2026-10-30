'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { seedQuestions } from '@/data/seedQuestions';
import { Question } from '@/types/question';
import { TestAttempt, AttemptAnswer, QuestionStatus } from '@/types/attempt';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Tag,
  BarChart2,
  FileSpreadsheet,
  Award,
  Hash,
  Delete,
} from 'lucide-react';

export default function TestPlayerPage() {
  const [phase, setPhase] = useState<'instructions' | 'test' | 'result'>('instructions');
  const [agreedInstructions, setAgreedInstructions] = useState(false);

  // Test state
  const questions: Question[] = seedQuestions;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60); // 30 minutes in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionReason, setSubmissionReason] = useState<'manual' | 'auto_timer'>('manual');

  // Answers & Question state
  // tentative selection before Save & Next
  const [tentativeAnswers, setTentativeAnswers] = useState<Record<string, string>>({});
  // committed answers
  const [committedAnswers, setCommittedAnswers] = useState<Record<string, string>>({});
  // status: 'not_visited' | 'not_answered' | 'answered' | 'marked_review'
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, QuestionStatus>>({});
  // per-question view count and time spent
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({});
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  // Active question timer
  const currentQId = questions[currentIdx]?.id;
  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Computed final attempt on submit
  const [completedAttempt, setCompletedAttempt] = useState<TestAttempt | null>(null);

  // Initialize statuses when entering test
  const startTest = () => {
    const initialStatuses: Record<string, QuestionStatus> = {};
    const initialTimes: Record<string, number> = {};
    const initialViews: Record<string, number> = {};

    questions.forEach((q, idx) => {
      initialStatuses[q.id] = idx === 0 ? 'not_answered' : 'not_visited';
      initialTimes[q.id] = 0;
      initialViews[q.id] = idx === 0 ? 1 : 0;
    });

    setQuestionStatuses(initialStatuses);
    setTimeSpent(initialTimes);
    setViewCounts(initialViews);
    setCurrentIdx(0);
    setTimeLeft(30 * 60);
    setPhase('test');
  };

  // Countdown timer
  useEffect(() => {
    if (phase !== 'test') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // Track per-question time spent
  useEffect(() => {
    if (phase !== 'test' || !currentQId) return;

    activeTimerRef.current = setInterval(() => {
      setTimeSpent((prev) => ({
        ...prev,
        [currentQId]: (prev[currentQId] || 0) + 1,
      }));
    }, 1000);

    return () => {
      if (activeTimerRef.current) clearInterval(activeTimerRef.current);
    };
  }, [phase, currentQId]);

  // Handle switching to a question
  const navigateToQuestion = (targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= questions.length) return;
    const targetQ = questions[targetIdx];

    // Mark current question as 'not_answered' if visited and no answer committed
    setQuestionStatuses((prev) => {
      const currentStatus = prev[currentQId];
      if (currentStatus === 'not_visited') {
        return { ...prev, [currentQId]: 'not_answered' };
      }
      return prev;
    });

    // Update target question: mark visited, increment view count
    setQuestionStatuses((prev) => {
      if (prev[targetQ.id] === 'not_visited') {
        return { ...prev, [targetQ.id]: 'not_answered' };
      }
      return prev;
    });

    setViewCounts((prev) => ({
      ...prev,
      [targetQ.id]: (prev[targetQ.id] || 0) + 1,
    }));

    // sync tentative answer from committed
    setTentativeAnswers((prev) => ({
      ...prev,
      [targetQ.id]: committedAnswers[targetQ.id] || '',
    }));

    setCurrentIdx(targetIdx);
  };

  // Action: Save & Next
  const handleSaveAndNext = () => {
    const currentVal = tentativeAnswers[currentQId];

    if (currentVal !== undefined && currentVal.trim() !== '') {
      // Save committed answer
      setCommittedAnswers((prev) => ({
        ...prev,
        [currentQId]: currentVal,
      }));
      setQuestionStatuses((prev) => ({
        ...prev,
        [currentQId]: 'answered',
      }));
    } else {
      // No answer provided
      setQuestionStatuses((prev) => ({
        ...prev,
        [currentQId]: 'not_answered',
      }));
    }

    if (currentIdx < questions.length - 1) {
      navigateToQuestion(currentIdx + 1);
    }
  };

  // Action: Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    const currentVal = tentativeAnswers[currentQId];

    if (currentVal !== undefined && currentVal.trim() !== '') {
      setCommittedAnswers((prev) => ({
        ...prev,
        [currentQId]: currentVal,
      }));
    }

    // Purple wins
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQId]: 'marked_review',
    }));

    if (currentIdx < questions.length - 1) {
      navigateToQuestion(currentIdx + 1);
    }
  };

  // Action: Clear Response
  const handleClearResponse = () => {
    setTentativeAnswers((prev) => ({
      ...prev,
      [currentQId]: '',
    }));
    setCommittedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQId];
      return copy;
    });
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQId]: 'not_answered',
    }));
  };

  // Auto submit when time hits 0
  const handleAutoSubmit = () => {
    setSubmissionReason('auto_timer');
    finishSubmission('auto_timer');
  };

  // Calculate scores and record attempt
  const finishSubmission = (subType: 'manual' | 'auto_timer' = 'manual') => {
    setShowSubmitModal(false);

    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let correctWithinTarget = 0;
    let answeredCount = 0;
    let visitedNotAnswered = 0;
    let notVisited = 0;
    let viewedMoreThanTwice = 0;

    const subjectScores = {
      Physics: { score: 0, max: 0, correct: 0, incorrect: 0 },
      Chemistry: { score: 0, max: 0, correct: 0, incorrect: 0 },
      Mathematics: { score: 0, max: 0, correct: 0, incorrect: 0 },
    };

    const attemptAnswersRecord: Record<string, AttemptAnswer> = {};

    questions.forEach((q) => {
      const sub = q.subject;
      subjectScores[sub].max += 4;

      const given = committedAnswers[q.id];
      const qStatus = questionStatuses[q.id] || 'not_visited';
      const qTime = timeSpent[q.id] || 0;
      const qViews = viewCounts[q.id] || 0;

      if (qViews > 2) {
        viewedMoreThanTwice += 1;
      }

      let isCorrect = false;
      let marks = 0;

      if (given !== undefined && given.trim() !== '') {
        answeredCount += 1;

        if (q.type === 'numerical') {
          const numGiven = parseFloat(given);
          const numCorrect = q.numericalAnswer ?? parseFloat(q.correctAnswer);
          const tolerance = q.numericalTolerance ?? 0.01;
          isCorrect = Math.abs(numGiven - numCorrect) <= tolerance;
        } else {
          isCorrect = given.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase();
        }

        if (isCorrect) {
          marks = 4;
          correctCount += 1;
          totalScore += 4;
          subjectScores[sub].score += 4;
          subjectScores[sub].correct += 1;

          if (qTime <= q.targetTimeSeconds) {
            correctWithinTarget += 1;
          }
        } else {
          marks = -1;
          incorrectCount += 1;
          totalScore -= 1;
          subjectScores[sub].score -= 1;
          subjectScores[sub].incorrect += 1;
        }
      } else {
        if (qStatus === 'not_visited') {
          notVisited += 1;
        } else {
          visitedNotAnswered += 1;
        }
      }

      attemptAnswersRecord[q.id] = {
        questionId: q.id,
        selectedOption: given || null,
        isCorrect,
        marks,
        timeSpentSec: qTime,
        viewCount: qViews,
        markedReview: qStatus === 'marked_review',
        status: qStatus,
      };
    });

    const maxScore = questions.length * 4;
    const timeTaken = 30 * 60 - timeLeft;

    // Get current logged-in user if any
    let studentName = 'Harsh Vardhan';
    let studentEmail = 'harsh.vardhan@spssn.edu';
    try {
      const auth = localStorage.getItem('rankdoors_auth');
      if (auth) {
        const parsed = JSON.parse(auth);
        if (parsed.name) studentName = parsed.name;
        if (parsed.email) studentEmail = parsed.email;
      }
    } catch {}

    const attemptData: TestAttempt = {
      id: `SPS-ATT-${Date.now()}`,
      testId: 'SPS-JEE-MOCK-01',
      testTitle: 'Sagar Public School JEE Main Diagnostic Test (PCM)',
      examType: 'JEE Main',
      studentName,
      studentEmail,
      startedAt: new Date(Date.now() - timeTaken * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      totalScore,
      maxScore,
      timeTakenSec: timeTaken,
      submissionType: subType,
      answers: attemptAnswersRecord,
      metrics: {
        totalQuestions: questions.length,
        answered: answeredCount,
        correct: correctCount,
        correctWithinTargetTime: correctWithinTarget,
        incorrect: incorrectCount,
        visitedNotAnswered,
        notVisited,
        viewedMoreThanTwice,
      },
      subjectScores,
    };

    // Save in localStorage (latest attempt + history)
    try {
      localStorage.setItem('rankdoors_latest_attempt', JSON.stringify(attemptData));

      const existingHistoryStr = localStorage.getItem('rankdoors_attempt_history');
      const historyList: TestAttempt[] = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];
      historyList.unshift(attemptData);
      localStorage.setItem('rankdoors_attempt_history', JSON.stringify(historyList));
    } catch (e) {
      console.error('Failed to save attempt to localStorage', e);
    }

    setCompletedAttempt(attemptData);
    setPhase('result');
  };

  // Format time MM:SS
  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Current question data
  const currentQ = questions[currentIdx];

  // Palette counts
  const paletteCounts = {
    answered: Object.values(questionStatuses).filter((s) => s === 'answered').length,
    not_answered: Object.values(questionStatuses).filter((s) => s === 'not_answered').length,
    marked_review: Object.values(questionStatuses).filter((s) => s === 'marked_review').length,
    not_visited: Object.values(questionStatuses).filter((s) => s === 'not_visited').length,
  };

  // -------------------------------------------------------------
  // PHASE 1: INSTRUCTIONS SCREEN
  // -------------------------------------------------------------
  if (phase === 'instructions') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-md">
          {/* Header */}
          <div className="border-b border-stone-200 dark:border-slate-700 pb-6 mb-6">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] border border-[#722F37]/30">
              Sagar Public School, Bhopal • Examination Cell
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
              JEE Main Diagnostic Simulation Test
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              PCM Chapter-Wise Assessment • Duration: 30 Minutes • Total Questions: {questions.length} • Max Marks: {questions.length * 4}
            </p>
          </div>

          {/* Instructions Body */}
          <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">
                1. General Instructions & Timing
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>Total test duration is <strong>30 minutes</strong>. The on-screen clock counts down continuously.</li>
                <li>When the timer falls below <strong>5 minutes</strong>, the display turns red as an alert.</li>
                <li>On timer expiration (00:00), the examination will automatically submit your saved responses.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">
                2. Marking Scheme
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300">+4 Marks</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">For each correct response</div>
                </div>
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                  <div className="font-bold text-rose-800 dark:text-rose-300">−1 Mark</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">For each incorrect response</div>
                </div>
                <div className="p-3 rounded-lg bg-stone-100 dark:bg-slate-700/60 border border-stone-200 dark:border-slate-600">
                  <div className="font-bold text-slate-800 dark:text-slate-200">0 Marks</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">For unattempted questions</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Numerical value questions require an exact number; tolerance is <strong>±0.01</strong>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">
                3. Question Palette Color Legend
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                  <span className="w-5 h-5 rounded bg-white border border-stone-300 dark:border-slate-500 shadow-sm"></span>
                  <span>Not Visited</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30">
                  <span className="w-5 h-5 rounded bg-[#EF4444] text-white flex items-center justify-center font-bold text-[10px]"></span>
                  <span className="font-medium text-rose-700 dark:text-rose-300">Visited, Not Answered</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                  <span className="w-5 h-5 rounded bg-[#22C55E] text-white flex items-center justify-center font-bold text-[10px]"></span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">Answered</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30">
                  <span className="w-5 h-5 rounded bg-[#A855F7] text-white flex items-center justify-center font-bold text-[10px]"></span>
                  <span className="font-medium text-purple-700 dark:text-purple-300">Marked for Review</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Important Saving Protocol:</strong> Selecting an answer does NOT save it automatically.
                You MUST click <strong>Save & Next</strong> to record your response. If you navigate away without clicking Save & Next, the response remains unsaved.
              </div>
            </div>

            {/* Checkbox */}
            <div className="pt-4 border-t border-stone-200 dark:border-slate-700 flex items-center gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={agreedInstructions}
                onChange={(e) => setAgreedInstructions(e.target.checked)}
                className="w-4 h-4 rounded text-[#722F37] focus:ring-[#722F37] cursor-pointer"
              />
              <label htmlFor="agree" className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer">
                I have read, understood, and agreed to follow all examination rules.
              </label>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={!agreedInstructions}
              onClick={startTest}
              className={`px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                agreedInstructions
                  ? 'bg-[#722F37] hover:bg-[#5F272E] text-white shadow-md hover:scale-[1.02]'
                  : 'bg-stone-300 dark:bg-slate-700 text-stone-500 cursor-not-allowed'
              }`}
            >
              Enter Test Screen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PHASE 2: ACTIVE TEST PLAYER SCREEN
  // -------------------------------------------------------------
  if (phase === 'test') {
    const isUnder5Min = timeLeft < 300;
    const currentAnswer = tentativeAnswers[currentQId] || '';

    return (
      <div className="flex-1 flex flex-col w-full bg-stone-100 dark:bg-slate-900 transition-colors duration-300">
        {/* Test Player Sub-header */}
        <div className="bg-white dark:bg-slate-800 border-b border-stone-200 dark:border-slate-700 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 hidden sm:inline">
              SPS JEE Main Mock
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="px-2 py-0.5 rounded bg-[#722F37] text-white font-semibold">
                {currentQ.subject}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Q {currentIdx + 1} of {questions.length}
              </span>
            </div>
          </div>

          {/* Timer Display */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1 rounded-md text-xs sm:text-sm font-mono font-bold border transition-colors ${
              isUnder5Min
                ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800 animate-pulse'
                : 'bg-stone-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border-stone-300 dark:border-slate-600'
            }`}
          >
            <Clock className={`w-4 h-4 ${isUnder5Min ? 'text-rose-600' : 'text-[#722F37]'}`} />
            <span>Time Left: {formatTimer(timeLeft)}</span>
          </div>
        </div>

        {/* Main Grid: Left Question, Right Palette */}
        <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Box (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm p-6">
            <div>
              {/* Question metadata strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-100 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    Question No. {currentIdx + 1}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 dark:text-slate-400">{currentQ.chapter}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-medium text-[#722F37] dark:text-[#ff99a8]">{currentQ.topic}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                    +4, −1
                  </span>
                  {currentQ.pyqTag && (
                    <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {currentQ.pyqTag}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <div className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-6">
                {currentQ.body}
              </div>

              {/* MCQ Options */}
              {currentQ.type === 'mcq_single' && currentQ.options && (
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt) => {
                    const isSelected = currentAnswer === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setTentativeAnswers((prev) => ({
                            ...prev,
                            [currentQId]: opt.id,
                          }))
                        }
                        className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-3 transition-colors ${
                          isSelected
                            ? 'bg-[#722F37]/10 dark:bg-[#722F37]/25 border-[#722F37] text-slate-900 dark:text-white font-semibold'
                            : 'bg-stone-50/50 dark:bg-slate-900/40 border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                            isSelected
                              ? 'bg-[#722F37] text-white border-[#722F37]'
                              : 'border-stone-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numerical Input + Keypad */}
              {currentQ.type === 'numerical' && (
                <div className="mb-6 p-4 rounded-xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-700">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Enter Numerical Value (Decimal or Integer, tolerance ±{currentQ.numericalTolerance ?? 0.01}):
                  </label>
                  <input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) =>
                      setTentativeAnswers((prev) => ({
                        ...prev,
                        [currentQId]: e.target.value,
                      }))
                    }
                    placeholder="Enter answer..."
                    className="w-full max-w-xs px-4 py-2.5 text-base font-mono font-bold rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#722F37] mb-4"
                  />

                  {/* Virtual on-screen keypad */}
                  <div className="w-full max-w-xs grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', '.'].map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          setTentativeAnswers((prev) => ({
                            ...prev,
                            [currentQId]: (prev[currentQId] || '') + key,
                          }))
                        }
                        className="py-2 rounded bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm"
                      >
                        {key}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setTentativeAnswers((prev) => ({
                          ...prev,
                          [currentQId]: (prev[currentQId] || '').slice(0, -1),
                        }))
                      }
                      className="col-span-2 py-2 rounded bg-stone-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-stone-300 flex items-center justify-center gap-1"
                    >
                      <Delete className="w-3.5 h-3.5" /> Backspace
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setTentativeAnswers((prev) => ({
                          ...prev,
                          [currentQId]: '',
                        }))
                      }
                      className="py-2 rounded bg-stone-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-stone-300"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Buttons Bar */}
            <div className="pt-4 border-t border-stone-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  className="px-4 py-2 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Save & Next
                </button>
                <button
                  type="button"
                  onClick={handleMarkForReviewAndNext}
                  className="px-4 py-2 rounded-lg bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Mark for Review & Next
                </button>
                <button
                  type="button"
                  onClick={handleClearResponse}
                  className="px-3 py-2 rounded-lg bg-stone-100 dark:bg-slate-700 hover:bg-stone-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => navigateToQuestion(currentIdx - 1)}
                  className={`p-2 rounded-lg border border-stone-200 dark:border-slate-700 text-xs font-medium flex items-center gap-1 ${
                    currentIdx === 0
                      ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  type="button"
                  disabled={currentIdx === questions.length - 1}
                  onClick={() => navigateToQuestion(currentIdx + 1)}
                  className={`p-2 rounded-lg border border-stone-200 dark:border-slate-700 text-xs font-medium flex items-center gap-1 ${
                    currentIdx === questions.length - 1
                      ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Question Palette (1 col) */}
          <div className="rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 pb-2 border-b border-stone-100 dark:border-slate-700">
                Question Palette
              </h3>

              {/* Palette Counters */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-[11px]">
                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <span className="text-emerald-800 dark:text-emerald-300 font-medium">Answered:</span>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">{paletteCounts.answered}</span>
                </div>
                <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-between">
                  <span className="text-rose-800 dark:text-rose-300 font-medium">Not Answered:</span>
                  <span className="font-bold text-rose-800 dark:text-rose-300">{paletteCounts.not_answered}</span>
                </div>
                <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
                  <span className="text-purple-800 dark:text-purple-300 font-medium">Marked Review:</span>
                  <span className="font-bold text-purple-800 dark:text-purple-300">{paletteCounts.marked_review}</span>
                </div>
                <div className="p-2 rounded bg-stone-50 dark:bg-slate-700/50 border border-stone-200 dark:border-slate-600 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Not Visited:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{paletteCounts.not_visited}</span>
                </div>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  const status = questionStatuses[q.id] || 'not_visited';
                  const isCurrent = idx === currentIdx;

                  let colorClass = 'bg-white dark:bg-slate-700 border-stone-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';
                  if (status === 'answered') {
                    colorClass = 'bg-[#22C55E] text-white border-[#22C55E]';
                  } else if (status === 'marked_review') {
                    colorClass = 'bg-[#A855F7] text-white border-[#A855F7]';
                  } else if (status === 'not_answered') {
                    colorClass = 'bg-[#EF4444] text-white border-[#EF4444]';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => navigateToQuestion(idx)}
                      className={`h-9 rounded font-bold text-xs flex items-center justify-center border transition-all ${colorClass} ${
                        isCurrent ? 'ring-2 ring-offset-2 ring-[#722F37]' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-stone-100 dark:border-slate-700 mt-4">
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-2.5 rounded-lg bg-[#451E24] hover:bg-[#38161C] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Submit Examination
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl p-6 shadow-2xl border border-stone-200 dark:border-slate-700 animate-fadeIn">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
                Confirm Examination Submission
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Please verify your attempt status before finalizing submission:
              </p>

              <div className="space-y-2 text-xs mb-6 p-3 rounded-lg bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span>Total Questions:</span>
                  <span className="font-bold">{questions.length}</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Answered:</span>
                  <span className="font-bold">{paletteCounts.answered}</span>
                </div>
                <div className="flex justify-between text-rose-600 dark:text-rose-400">
                  <span>Not Answered:</span>
                  <span className="font-bold">{paletteCounts.not_answered}</span>
                </div>
                <div className="flex justify-between text-purple-600 dark:text-purple-400">
                  <span>Marked for Review:</span>
                  <span className="font-bold">{paletteCounts.marked_review}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Not Visited:</span>
                  <span className="font-bold">{paletteCounts.not_visited}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-lg bg-stone-200 dark:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-stone-300"
                >
                  Resume Test
                </button>
                <button
                  type="button"
                  onClick={() => finishSubmission('manual')}
                  className="px-4 py-2 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-xs font-bold text-white shadow-sm"
                >
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // PHASE 3: RESULT & QUESTION-LEVEL REVIEW SCREEN
  // -------------------------------------------------------------
  if (phase === 'result' && completedAttempt) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Banner */}
        <div className="rounded-2xl p-8 bg-gradient-to-r from-[#451E24] to-[#722F37] text-white shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold border border-white/20 mb-2">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Test Completed • {completedAttempt.submissionType === 'auto_timer' ? 'Auto-submitted on time expiry' : 'Submitted by Student'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {completedAttempt.testTitle}
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 mt-1">
                Student: <strong>{completedAttempt.studentName}</strong> ({completedAttempt.studentEmail}) • Time Taken: {Math.floor(completedAttempt.timeTakenSec / 60)}m {completedAttempt.timeTakenSec % 60}s
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center min-w-[140px]">
              <div className="text-xs uppercase tracking-wider text-stone-300 font-medium">Total Score</div>
              <div className="text-4xl font-extrabold text-white mt-1">
                {completedAttempt.totalScore}
                <span className="text-lg font-normal text-stone-300"> / {completedAttempt.maxScore}</span>
              </div>
              <div className="text-[11px] text-stone-300 mt-1">
                Accuracy: {completedAttempt.metrics.answered > 0 ? Math.round((completedAttempt.metrics.correct / completedAttempt.metrics.answered) * 100) : 0}%
              </div>
            </div>
          </div>

          {/* Quick links to reports */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
            <Link
              href="/report"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#722F37] font-bold text-xs shadow-sm hover:bg-stone-100 transition-colors"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              View Full PAR Diagnostic Report
            </Link>
            <Link
              href="/ctr"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 text-white font-semibold text-xs border border-white/30 hover:bg-white/30 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              View Cumulative CTR Progress
            </Link>
            <button
              onClick={() => {
                setPhase('instructions');
                setAgreedInstructions(false);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-colors ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Test
            </button>
          </div>
        </div>

        {/* Subject Score Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {(['Physics', 'Chemistry', 'Mathematics'] as const).map((sub) => {
            const data = completedAttempt.subjectScores[sub];
            return (
              <div
                key={sub}
                className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm"
              >
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {sub}
                </div>
                <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                  {data.score} <span className="text-xs text-slate-400 font-normal">/ {data.max}</span>
                </div>
                <div className="mt-2 text-xs flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-400">✓ {data.correct} Correct</span>
                  <span className="text-rose-600 dark:text-rose-400">✗ {data.incorrect} Incorrect</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
            Question-by-Question Review & Solutions
          </h2>

          {questions.map((q, idx) => {
            const ans = completedAttempt.answers[q.id];
            const isAttempted = ans?.selectedOption !== null && ans?.selectedOption !== undefined;
            const isCorrect = ans?.isCorrect;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-xl border bg-white dark:bg-slate-800 transition-colors ${
                  !isAttempted
                    ? 'border-stone-200 dark:border-slate-700'
                    : isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-rose-300 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/10'
                }`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-[#722F37]">Q{idx + 1}.</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{q.subject}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{q.chapter}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Time: {ans?.timeSpentSec || 0}s</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">Views: {ans?.viewCount || 0}</span>
                    <span className="text-slate-400">•</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        !isAttempted
                          ? 'bg-stone-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          : isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {!isAttempted ? 'Not Attempted (0)' : isCorrect ? '+4 Marks' : '−1 Mark'}
                    </span>
                  </div>
                </div>

                <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-4">
                  {q.body}
                </div>

                {/* Answers Comparison */}
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-slate-900 text-xs space-y-1.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500">Your Answer:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {ans?.selectedOption ? ans.selectedOption : 'None'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500">Correct Answer:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {q.type === 'numerical' ? q.numericalAnswer : q.correctAnswer}
                    </span>
                  </div>
                </div>

                {/* Solution */}
                <div className="text-xs text-slate-600 dark:text-slate-300 pl-3 border-l-2 border-[#722F37] whitespace-pre-line leading-relaxed">
                  <strong>Solution:</strong>
                  <div className="mt-1">{q.solution}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

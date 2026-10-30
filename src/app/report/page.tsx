'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { baselineSampleAttempt } from '@/data/sampleAttempt';
import { seedQuestions } from '@/data/seedQuestions';
import { TestAttempt } from '@/types/attempt';
import { Question } from '@/types/question';
import {
  BarChart3,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Filter,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Tag,
  Hash,
  ChevronDown,
} from 'lucide-react';

export default function PARReportPage() {
  const [attempt, setAttempt] = useState<TestAttempt>(baselineSampleAttempt);
  const [filterAnalysis, setFilterAnalysis] = useState<'All' | 'Correct' | 'Incorrect' | 'Not Answered' | 'Viewed > 2x'>('All');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem('rankdoors_latest_attempt');
      if (stored) {
        setAttempt(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const metrics = attempt.metrics;
  const questionsMap = new Map<string, Question>(seedQuestions.map((q) => [q.id, q]));

  // Filter questions according to "Choose Test Analysis"
  const questionsList = Object.keys(attempt.answers).map((qId) => {
    const qData = questionsMap.get(qId);
    const ansData = attempt.answers[qId];
    return {
      id: qId,
      question: qData,
      attemptAnswer: ansData,
    };
  });

  const filteredQuestions = questionsList.filter((item) => {
    const ans = item.attemptAnswer;
    const isAnswered = ans.selectedOption !== null && ans.selectedOption !== undefined && ans.selectedOption.trim() !== '';

    if (filterAnalysis === 'Correct') return ans.isCorrect;
    if (filterAnalysis === 'Incorrect') return isAnswered && !ans.isCorrect;
    if (filterAnalysis === 'Not Answered') return !isAnswered;
    if (filterAnalysis === 'Viewed > 2x') return (ans.viewCount || 0) > 2;
    return true;
  });

  // Batch rank & percentile (Within-batch only!)
  const batchTotal = 45;
  const batchRank = 4;
  const batchPercentile = 91.1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Sagar Public School • PAR Diagnostics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Performance Analysis Report (PAR)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Test: <strong className="text-slate-700 dark:text-slate-300">{attempt.testTitle}</strong> • Session ID: <span className="font-mono">{attempt.id}</span>
          </p>
          <div className="text-xs text-slate-400 mt-0.5">
            Student: <strong>{attempt.studentName}</strong> ({attempt.studentEmail}) • Completed On: {new Date(attempt.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/ctr"
            className="px-4 py-2 rounded-lg bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors"
          >
            Cumulative CTR Report
          </Link>
          <Link
            href="/test"
            className="px-4 py-2 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold shadow-sm transition-colors"
          >
            Take Another Test
          </Link>
        </div>
      </div>

      {/* Top Cards: Total Score & Within-Batch Honest Ranking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Score */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#451E24] to-[#722F37] text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-stone-300 font-semibold">
              Total Score
            </div>
            <div className="text-4xl font-extrabold mt-2">
              {attempt.totalScore}
              <span className="text-xl font-normal text-stone-300"> / {attempt.maxScore}</span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/20 text-xs text-stone-200 flex items-center justify-between">
            <span>Accuracy: {metrics.answered > 0 ? Math.round((metrics.correct / metrics.answered) * 100) : 0}%</span>
            <span>Time Taken: {Math.floor(attempt.timeTakenSec / 60)}m {attempt.timeTakenSec % 60}s</span>
          </div>
        </div>

        {/* Within-Batch Rank Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                School Batch Rank
              </span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              Rank {batchRank} <span className="text-base font-normal text-slate-400">/ {batchTotal} Students</span>
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              Batch Percentile: {batchPercentile}%ile
            </div>
          </div>
          <div className="pt-3 border-t border-stone-100 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#722F37]" />
            <span>Calibrated within SPS Saket Nagar cohort only.</span>
          </div>
        </div>

        {/* Time Efficiency */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Time Management
              </span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              {metrics.correctWithinTargetTime} <span className="text-base font-normal text-slate-400">/ {metrics.correct} Correct</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Solved strictly within the allocated target time
            </div>
          </div>
          <div className="pt-3 border-t border-stone-100 dark:border-slate-700/60 text-[11px] text-slate-400">
            Average Speed: {metrics.answered > 0 ? Math.round(attempt.timeTakenSec / metrics.answered) : 0}s per answered question
          </div>
        </div>
      </div>

      {/* Subject-Wise Score Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {(['Physics', 'Chemistry', 'Mathematics'] as const).map((sub) => {
          const subData = attempt.subjectScores[sub];
          return (
            <div
              key={sub}
              className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm"
            >
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {sub} Marks
              </div>
              <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                {subData.score} <span className="text-xs font-normal text-slate-400">/ {subData.max}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-stone-100 dark:border-slate-700/60 text-[11px] flex justify-between text-slate-500 dark:text-slate-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ {subData.correct} Correct</span>
                <span className="text-rose-600 dark:text-rose-400 font-semibold">✗ {subData.incorrect} Incorrect</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* The 8 Blueprint Metrics Cards */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">
          Blueprint Diagnostics (8 Core Metrics)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {/* Metric 1: Questions */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Questions</div>
            <div className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{metrics.totalQuestions}</div>
          </div>

          {/* Metric 2: Answered */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Answered</div>
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{metrics.answered}</div>
          </div>

          {/* Metric 3: Correct */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 bg-emerald-50/20 text-center">
            <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">Correct</div>
            <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{metrics.correct}</div>
          </div>

          {/* Metric 4: Correct Within Target Time */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-center">
            <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">Target Time</div>
            <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">{metrics.correctWithinTargetTime}</div>
          </div>

          {/* Metric 5: Incorrect */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 bg-rose-50/20 text-center">
            <div className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase">Incorrect</div>
            <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{metrics.incorrect}</div>
          </div>

          {/* Metric 6: Visited But Not Answered */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Visited Unans.</div>
            <div className="text-xl font-extrabold text-slate-700 dark:text-slate-300 mt-1">{metrics.visitedNotAnswered}</div>
          </div>

          {/* Metric 7: Not Visited */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Not Visited</div>
            <div className="text-xl font-extrabold text-slate-500 mt-1">{metrics.notVisited}</div>
          </div>

          {/* Metric 8: Viewed More Than Twice */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 bg-purple-50/20 text-center">
            <div className="text-[10px] font-bold text-purple-800 dark:text-purple-300 uppercase">Viewed &gt; 2x</div>
            <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">{metrics.viewedMoreThanTwice}</div>
          </div>
        </div>
      </div>

      {/* "Choose Test Analysis" Filter Toolbar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#722F37]" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Choose Test Analysis:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {(['All', 'Correct', 'Incorrect', 'Not Answered', 'Viewed > 2x'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterAnalysis(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterAnalysis === tab
                  ? 'bg-[#722F37] text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Question Details List */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filteredQuestions.length}</span> question analyses for selected filter ({filterAnalysis})
        </div>

        {filteredQuestions.map((item, idx) => {
          const q = item.question;
          const ans = item.attemptAnswer;
          if (!q) return null;

          const isAnswered = ans.selectedOption !== null && ans.selectedOption !== undefined && ans.selectedOption.trim() !== '';
          const isCorrect = ans.isCorrect;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-xl border bg-white dark:bg-slate-800 transition-colors shadow-sm ${
                !isAnswered
                  ? 'border-stone-200 dark:border-slate-700'
                  : isCorrect
                  ? 'border-emerald-200 dark:border-emerald-800'
                  : 'border-rose-200 dark:border-rose-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-100 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#722F37] dark:text-[#ff99a8]">Q{idx + 1}.</span>
                  <span className="font-mono text-[11px] text-slate-400">{q.id}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{q.subject}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{q.chapter}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">{q.topic}</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    {ans.timeSpentSec}s / {q.targetTimeSeconds}s target
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className={`flex items-center gap-1 ${ans.viewCount > 2 ? 'text-purple-600 font-bold' : 'text-slate-500'}`}>
                    <Eye className="w-3.5 h-3.5" />
                    {ans.viewCount} views
                  </span>
                  <span className="text-slate-400">•</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      !isAnswered
                        ? 'bg-stone-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        : isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {!isAnswered ? 'Unattempted (0)' : isCorrect ? '+4 Marks' : '−1 Mark'}
                  </span>
                </div>
              </div>

              <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-4">
                {q.body}
              </div>

              {/* Comparison strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-stone-50 dark:bg-slate-900 text-xs mb-4">
                <div>
                  <span className="text-slate-500">Student Response: </span>
                  <strong className={isCorrect ? 'text-emerald-600' : isAnswered ? 'text-rose-600' : 'text-slate-500'}>
                    {ans.selectedOption ? ans.selectedOption : 'Not Attempted'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500">Official Correct Answer: </span>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    {q.type === 'numerical' ? q.numericalAnswer : q.correctAnswer}
                  </strong>
                </div>
              </div>

              {/* Solution */}
              <div className="text-xs text-slate-600 dark:text-slate-300 pl-3 border-l-2 border-[#722F37] whitespace-pre-line leading-relaxed">
                <strong>Solution & Explanation:</strong>
                <div className="mt-1">{q.solution}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

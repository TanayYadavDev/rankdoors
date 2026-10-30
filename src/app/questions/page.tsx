'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { seedQuestions } from '@/data/seedQuestions';
import { Subject, Difficulty, QuestionType } from '@/types/question';
import {
  BookOpen,
  Filter,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Tag,
  ArrowRight,
  HelpCircle,
  Hash,
} from 'lucide-react';

export default function QuestionBankPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [onlyPYQ, setOnlyPYQ] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredQuestions = seedQuestions.filter((q) => {
    if (selectedSubject !== 'All' && q.subject !== selectedSubject) return false;
    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
    if (selectedType !== 'All' && q.type !== selectedType) return false;
    if (onlyPYQ && !q.pyqTag) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchBody = q.body.toLowerCase().includes(query);
      const matchChapter = q.chapter.toLowerCase().includes(query);
      const matchTopic = q.topic.toLowerCase().includes(query);
      return matchBody || matchChapter || matchTopic;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#722F37] dark:text-[#ff99a8] uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            Sagar Public School Academic Repository
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            PCM Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Chapter-wise JEE Main and Foundation questions. Answers are hidden by default for active practice.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-semibold shadow-sm transition-colors duration-300"
          >
            <span>Take Simulated Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm mb-8 space-y-4 transition-colors duration-300">
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
          {/* Subject Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Subject:</span>
            {['All', 'Physics', 'Chemistry', 'Mathematics'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedSubject === sub
                    ? 'bg-[#722F37] text-white font-semibold'
                    : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-stone-300 dark:bg-slate-600 hidden sm:block"></div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Difficulty:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                    : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-stone-300 dark:bg-slate-600 hidden sm:block"></div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Type:</span>
            {[
              { val: 'All', label: 'All' },
              { val: 'mcq_single', label: 'MCQ' },
              { val: 'numerical', label: 'Numerical' },
            ].map((t) => (
              <button
                key={t.val}
                onClick={() => setSelectedType(t.val)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedType === t.val
                    ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                    : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-stone-300 dark:bg-slate-600 hidden sm:block"></div>

          {/* Only PYQs checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300 ml-auto">
            <input
              type="checkbox"
              checked={onlyPYQ}
              onChange={(e) => setOnlyPYQ(e.target.checked)}
              className="rounded text-[#722F37] focus:ring-[#722F37] w-4 h-4 cursor-pointer"
            />
            <span className="font-semibold text-xs flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              Verified PYQs Only
            </span>
          </label>
        </div>

        {/* Search input */}
        <div className="pt-2">
          <input
            type="text"
            placeholder="Search by chapter, topic, or keyword (e.g., Kinematics, Integral, VSEPR)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
          />
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filteredQuestions.length}</span> verified questions
        </div>

        {filteredQuestions.map((q, idx) => {
          const isRevealed = !!revealedSolutions[q.id];

          return (
            <div
              key={q.id}
              className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm transition-colors duration-300"
            >
              {/* Top metadata tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-100 dark:border-slate-700/60">
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {q.id}
                  </span>
                  <span className="font-semibold px-2 py-0.5 rounded bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] border border-[#722F37]/30">
                    {q.subject}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {q.chapter} • <strong className="font-medium text-slate-700 dark:text-slate-300">{q.topic}</strong>
                  </span>
                  <span className="text-slate-400">• Class {q.classLevel}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  {/* Difficulty functional badge */}
                  <span
                    className={`font-semibold px-2 py-0.5 rounded border ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                    }`}
                  >
                    {q.difficulty}
                  </span>

                  <span className="font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase">
                    {q.type === 'numerical' ? 'Numerical' : 'Single MCQ'}
                  </span>

                  {/* Verified PYQ Tag */}
                  {q.pyqTag && (
                    <span className="font-semibold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {q.pyqTag}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-4">
                <span className="font-bold text-[#722F37] dark:text-[#ff99a8] mr-2">Q{idx + 1}.</span>
                {q.body}
              </div>

              {/* MCQ Options */}
              {q.type === 'mcq_single' && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="p-3 rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900/50 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200"
                    >
                      <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0">
                        ({opt.id})
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Numerical info box */}
              {q.type === 'numerical' && (
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-slate-900/80 border border-dashed border-stone-300 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-[#722F37]" />
                  <span>Enter the exact numerical value (Tolerance: ±{q.numericalTolerance ?? 0.01})</span>
                </div>
              )}

              {/* Reveal Toggle & Action Strip */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-slate-700/60 text-xs">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Target Time: {q.targetTimeSeconds}s</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSolution(q.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors ${
                    isRevealed
                      ? 'bg-stone-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                      : 'bg-[#722F37] text-white hover:bg-[#5F272E]'
                  }`}
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Solution & Answer</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Solution & Answer</span>
                    </>
                  )}
                </button>
              </div>

              {/* Hidden Solution Drawer */}
              {isRevealed && (
                <div className="mt-4 p-4 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      Correct Answer:{' '}
                      <span className="font-mono text-sm underline">
                        {q.type === 'numerical' ? q.numericalAnswer : `Option (${q.correctAnswer})`}
                      </span>
                    </span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line font-sans leading-relaxed pt-1">
                    <strong>Step-by-step Solution:</strong>
                    <div className="mt-1 pl-2 border-l-2 border-emerald-400 dark:border-emerald-600">
                      {q.solution}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

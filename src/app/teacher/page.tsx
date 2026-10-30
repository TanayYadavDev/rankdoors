'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';
import { seedQuestions } from '@/data/seedQuestions';
import { Question, Subject, Difficulty, ExamPattern } from '@/types/question';
import {
  Users,
  FilePlus,
  BookOpen,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  Send,
  Trash2,
  CheckSquare,
  Square,
  Tag,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

export default function TeacherPanelPage() {
  // Filters for TIPS
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [patternFilter, setPatternFilter] = useState<string>('All');
  const [usageFilter, setUsageFilter] = useState<'All' | 'Unused' | 'Used'>('All');

  // Selected questions in current paper
  const [selectedQIds, setSelectedQIds] = useState<string[]>(['PHY-101', 'PHY-102', 'CHM-101', 'MTH-101']);

  // Schedule Test Form State
  const [testTitle, setTestTitle] = useState<string>('Physics & Chemistry JEE Targeted Test');
  const [targetBatch, setTargetBatch] = useState<string>('Class 12 - Target JEE 2027 (Batch A)');
  const [durationMin, setDurationMin] = useState<number>(60);
  const [windowStart, setWindowStart] = useState<string>('2026-11-02T09:00');
  const [windowEnd, setWindowEnd] = useState<string>('2026-11-06T18:00');
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  // Filter logic
  const availableQuestions = seedQuestions.filter((q) => {
    if (subjectFilter !== 'All' && q.subject !== subjectFilter) return false;
    if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter) return false;
    if (patternFilter !== 'All' && q.pattern !== patternFilter) return false;
    // mock usage tagging: PHY-101 and MTH-101 treated as used, others unused
    const isUsed = q.id === 'PHY-101' || q.id === 'MTH-101';
    if (usageFilter === 'Unused' && isUsed) return false;
    if (usageFilter === 'Used' && !isUsed) return false;
    return true;
  });

  const toggleSelectQuestion = (id: string) => {
    setSelectedQIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllFiltered = () => {
    const allFilteredIds = availableQuestions.map((q) => q.id);
    const combined = Array.from(new Set([...selectedQIds, ...allFilteredIds]));
    setSelectedQIds(combined);
  };

  const deselectAll = () => {
    setSelectedQIds([]);
  };

  // Selected questions breakdown
  const selectedQuestions = seedQuestions.filter((q) => selectedQIds.includes(q.id));
  const physicsCount = selectedQuestions.filter((q) => q.subject === 'Physics').length;
  const chemCount = selectedQuestions.filter((q) => q.subject === 'Chemistry').length;
  const mathsCount = selectedQuestions.filter((q) => q.subject === 'Mathematics').length;
  const totalMarks = selectedQuestions.length * 4;

  const handleScheduleTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQIds.length === 0) {
      alert('Please select at least 1 question for the test paper.');
      return;
    }

    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
    }, 6000);
  };

  return (
    <RoleGuard allowedRole="teacher">
      {(user) => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30">
                <Users className="w-3.5 h-3.5" />
                <span>Faculty Console • TIPS Paper Generator</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                TIPS: Teacher&apos;s Interface for Paper Setting
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Faculty: <strong>{user.name}</strong> • {user.department || 'Senior Science Wing'} • Sagar Public School, Saket Nagar
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/questions"
                className="px-4 py-2 rounded-lg bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors"
              >
                Browse All Questions
              </Link>
            </div>
          </div>

          {publishSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>
                  <strong>Test Scheduled Successfully!</strong> &ldquo;{testTitle}&rdquo; has been mapped to <strong>{targetBatch}</strong> with window {windowStart.replace('T', ' ')} to {windowEnd.replace('T', ' ')}.
                </span>
              </div>
              <Link
                href="/dashboard"
                className="underline font-bold text-xs ml-4"
              >
                View on Student Dashboard
              </Link>
            </div>
          )}

          {/* Main 2-Column TIPS Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (2 Cols): Question Selection & Filter */}
            <div className="lg:col-span-2 space-y-6">
              {/* TIPS Filter Toolbar */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pb-2 border-b border-stone-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#722F37]" />
                    <span>TIPS Filter Question Bank</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={selectAllFiltered}
                      className="text-[#722F37] dark:text-[#ff99a8] hover:underline"
                    >
                      Select All Filtered
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={deselectAll}
                      className="text-slate-500 hover:underline"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                {/* Filter Controls Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {/* Subject */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Subject
                    </label>
                    <select
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs"
                    >
                      <option value="All">All Subjects</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Mathematics">Mathematics</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs"
                    >
                      <option value="All">All Difficulties</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Pattern */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Pattern
                    </label>
                    <select
                      value={patternFilter}
                      onChange={(e) => setPatternFilter(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs"
                    >
                      <option value="All">All Patterns</option>
                      <option value="JEE Main">JEE Main</option>
                      <option value="JEE Foundation">JEE Foundation</option>
                    </select>
                  </div>

                  {/* Usage */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Status
                    </label>
                    <select
                      value={usageFilter}
                      onChange={(e) => setUsageFilter(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs"
                    >
                      <option value="All">All Questions</option>
                      <option value="Unused">Unused Only</option>
                      <option value="Used">Previously Used</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Questions Picker List */}
              <div className="space-y-3">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Available Questions: <strong>{availableQuestions.length}</strong></span>
                  <span>Selected for paper: <strong className="text-[#722F37] dark:text-[#ff99a8]">{selectedQIds.length}</strong></span>
                </div>

                {availableQuestions.map((q) => {
                  const isSelected = selectedQIds.includes(q.id);

                  return (
                    <div
                      key={q.id}
                      onClick={() => toggleSelectQuestion(q.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#722F37] bg-[#722F37]/5 dark:bg-[#722F37]/15 shadow-sm'
                          : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#722F37]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="font-mono font-bold text-slate-500">{q.id}</span>
                              <span className="font-bold text-[#722F37] dark:text-[#ff99a8]">{q.subject}</span>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-600 dark:text-slate-300">{q.chapter}</span>
                            </div>

                            <div className="flex items-center gap-2 text-[10px]">
                              <span
                                className={`px-2 py-0.5 rounded font-bold border ${
                                  q.difficulty === 'Easy'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : q.difficulty === 'Medium'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}
                              >
                                {q.difficulty}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold uppercase">
                                {q.type === 'numerical' ? 'Numerical' : 'MCQ'}
                              </span>
                              {q.pyqTag && (
                                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                                  PYQ
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-2">
                            {q.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (1 Col): Paper Summary & Schedule Form */}
            <div className="space-y-6">
              {/* Paper Summary Box */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-slate-700">
                  <Layers className="w-4 h-4 text-[#722F37]" />
                  <span>Paper Composition Summary</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Total Questions:</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{selectedQIds.length}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Total Marks:</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{totalMarks} Marks</strong>
                  </div>
                  <div className="pt-2 border-t border-stone-100 dark:border-slate-700 flex justify-between text-xs text-slate-500">
                    <span>Physics: <strong>{physicsCount}</strong></span>
                    <span>Chemistry: <strong>{chemCount}</strong></span>
                    <span>Maths: <strong>{mathsCount}</strong></span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-stone-50 dark:bg-slate-900 p-2.5 rounded-lg border border-stone-200 dark:border-slate-700">
                  Marking scheme: <strong>+4 / −1 / 0</strong> (±0.01 tolerance on numerical questions).
                </div>
              </div>

              {/* Schedule Test Form */}
              <form
                onSubmit={handleScheduleTest}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-slate-700">
                  <Calendar className="w-4 h-4 text-[#722F37]" />
                  <span>Schedule Test Window</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Test Title
                  </label>
                  <input
                    type="text"
                    required
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Batch / Cohort
                  </label>
                  <select
                    value={targetBatch}
                    onChange={(e) => setTargetBatch(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                  >
                    <option value="Class 12 - Target JEE 2027 (Batch A)">Class 12 - Target JEE 2027 (Batch A)</option>
                    <option value="Class 12 - Target JEE 2027 (Batch B)">Class 12 - Target JEE 2027 (Batch B)</option>
                    <option value="Class 11 - JEE Foundation (Batch A)">Class 11 - JEE Foundation (Batch A)</option>
                    <option value="Class 10 - Foundation Achievers">Class 10 - Foundation Achievers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={180}
                    value={durationMin}
                    onChange={(e) => setDurationMin(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Test Window Start (Date & Time)
                  </label>
                  <input
                    type="datetime-local"
                    value={windowStart}
                    onChange={(e) => setWindowStart(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Test Window End (Date & Time)
                  </label>
                  <input
                    type="datetime-local"
                    value={windowEnd}
                    onChange={(e) => setWindowEnd(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedQIds.length === 0}
                  className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors ${
                    selectedQIds.length > 0
                      ? 'bg-[#722F37] hover:bg-[#5F272E] text-white'
                      : 'bg-stone-300 dark:bg-slate-700 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish & Schedule Test</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </RoleGuard>
  );
}

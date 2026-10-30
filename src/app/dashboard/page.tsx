'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';
import { sampleScheduledTests, ScheduledTest } from '@/data/sampleScheduledTests';
import { TestAttempt } from '@/types/attempt';
import {
  GraduationCap,
  Calendar,
  Clock,
  Award,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  FileText,
  HelpCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'missed' | 'completed' | 'left_in_between'>('active');
  const [latestAttempt, setLatestAttempt] = useState<TestAttempt | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rankdoors_latest_attempt');
      if (stored) {
        setLatestAttempt(JSON.parse(stored));
      }
    } catch {}
  }, []);

  return (
    <RoleGuard allowedRole="student">
      {(user) => {
        // Filter tests for the active tab
        const tabTests = sampleScheduledTests.filter((t) => t.status === activeTab);

        // Stats calculation
        const totalTestsCount = latestAttempt ? 7 : 6;
        const lastAttemptDate = latestAttempt
          ? new Date(latestAttempt.submittedAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : '25-Oct-2026';

        const lastAttemptScore = latestAttempt
          ? `${latestAttempt.totalScore} / ${latestAttempt.maxScore}`
          : '84 / 100';

        const bestScore = latestAttempt && latestAttempt.totalScore > 84
          ? `${latestAttempt.totalScore} / ${latestAttempt.maxScore}`
          : '88 / 100';

        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
            {/* Student Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Sagar Public School • Student Portal</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                  Welcome back, {user.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {user.classBatch || 'Class 12 - Target JEE 2027 (PCM)'} • Saket Nagar Campus
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/test"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Start Live Mock Test</span>
                </Link>
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors"
                >
                  <BarChart3 className="w-4 h-4 text-[#722F37]" />
                  <span>PAR Report</span>
                </Link>
              </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {/* Stat 1: Total Tests */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Tests</span>
                  <FileText className="w-4 h-4 text-[#722F37]" />
                </div>
                <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  {totalTestsCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Scheduled & Self-Practice Mock Tests</div>
              </div>

              {/* Stat 2: Last Attempt Date */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Last Attempt Date</span>
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                  {lastAttemptDate}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Latest session recorded</div>
              </div>

              {/* Stat 3: Last Attempt Score */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Last Attempt Score</span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  {lastAttemptScore}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                  {latestAttempt ? `Marks: ${latestAttempt.totalScore}` : 'Above cohort median'}
                </div>
              </div>

              {/* Stat 4: Best Score */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Best Score</span>
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-3xl font-extrabold text-[#722F37] dark:text-[#ff99a8]">
                  {bestScore}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Batch Rank: 4 / 45 students</div>
              </div>
            </div>

            {/* My Scheduled Tests Section */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm p-6 mb-8 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                    My Scheduled Tests
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tests stay accessible throughout their allocated window. Submit before window closes.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <HelpCircle className="w-4 h-4 text-[#722F37]" />
                  <span>Desktop & Mobile Supported</span>
                </div>
              </div>

              {/* 5 Status Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-stone-100 dark:bg-slate-700/60 mb-6 text-xs font-semibold">
                {[
                  { id: 'active', label: 'Active', count: sampleScheduledTests.filter((t) => t.status === 'active').length },
                  { id: 'upcoming', label: 'Upcoming', count: sampleScheduledTests.filter((t) => t.status === 'upcoming').length },
                  { id: 'missed', label: 'Missed', count: sampleScheduledTests.filter((t) => t.status === 'missed').length },
                  { id: 'completed', label: 'Completed', count: sampleScheduledTests.filter((t) => t.status === 'completed').length },
                  { id: 'left_in_between', label: 'Left In Between', count: sampleScheduledTests.filter((t) => t.status === 'left_in_between').length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-[#722F37] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        activeTab === tab.id
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Table of Scheduled Tests */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-3">Scheduled Test Name</th>
                      <th className="py-3 px-3">Subject</th>
                      <th className="py-3 px-3">Test Window Start</th>
                      <th className="py-3 px-3">Test Window End</th>
                      <th className="py-3 px-3">Duration</th>
                      <th className="py-3 px-3">Status / Result</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-slate-700/60">
                    {tabTests.map((t) => (
                      <tr
                        key={t.id}
                        className="hover:bg-stone-50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-slate-800 dark:text-slate-100">
                            {t.name}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            By: {t.scheduledBy}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                          {t.subject}
                        </td>
                        <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {t.windowStart}
                        </td>
                        <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {t.windowEnd}
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                          {t.durationMin} Min
                        </td>
                        <td className="py-3.5 px-3">
                          {t.status === 'active' && (
                            <span className="font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              Open Window
                            </span>
                          )}
                          {t.status === 'upcoming' && (
                            <span className="font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              Upcoming
                            </span>
                          )}
                          {t.status === 'missed' && (
                            <span className="font-bold text-rose-600 dark:text-rose-400">
                              Absent
                            </span>
                          )}
                          {t.status === 'completed' && (
                            <span className="font-bold text-slate-800 dark:text-slate-100">
                              {t.score}
                            </span>
                          )}
                          {t.status === 'left_in_between' && (
                            <span className="font-semibold text-amber-600 dark:text-amber-400">
                              Left In Between
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          {t.status === 'active' && (
                            <Link
                              href="/test"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#722F37] hover:bg-[#5F272E] text-white font-bold transition-colors shadow-sm"
                            >
                              <span>Start Test</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                          {t.status === 'upcoming' && (
                            <button
                              disabled
                              className="px-3 py-1.5 rounded bg-stone-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-medium cursor-not-allowed"
                            >
                              Not Started
                            </button>
                          )}
                          {t.status === 'completed' && (
                            <Link
                              href="/report"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 text-slate-800 dark:text-slate-100 font-semibold transition-colors"
                            >
                              View Report
                            </Link>
                          )}
                          {t.status === 'missed' && (
                            <span className="text-[11px] text-slate-400 italic">Expired</span>
                          )}
                          {t.status === 'left_in_between' && (
                            <span className="text-[11px] text-slate-400 italic">Locked</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }}
    </RoleGuard>
  );
}

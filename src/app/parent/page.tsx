'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';
import {
  UserCheck,
  ShieldCheck,
  FileSpreadsheet,
  BarChart2,
  Lock,
  Calendar,
  Award,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  School,
  CheckCircle2,
} from 'lucide-react';
import { TestAttempt } from '@/types/attempt';

export default function ParentDashboardPage() {
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
    <RoleGuard allowedRole="parent">
      {(user) => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Parent Guardian Console • Sagar Public School</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                Guardian Portal: {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enrolled Ward: <strong className="text-slate-800 dark:text-slate-200">{user.childName || 'Harsh Vardhan (Class 12 - Batch A)'}</strong> • Saket Nagar Campus
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/ctr"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold shadow-sm transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Open Child CTR Report</span>
              </Link>
            </div>
          </div>

          {/* Read-Only Status Alert */}
          <div className="p-4 rounded-xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mb-8 flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#722F37] shrink-0 mt-0.5" />
            <div>
              <strong>Read-Only Policy:</strong> In accordance with Sagar Public School examination regulations, guardians have read-only visibility into test scores, batch percentiles, and cumulative reports. Guardians cannot restart or reopen concluded test sessions.
            </div>
          </div>

          {/* Ward Summary Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
                <span>Total Tests Scheduled</span>
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
                6 Tests
              </div>
              <div className="text-[11px] text-slate-400 mt-1">4 Attempted • 2 Missed</div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
                <span>Latest Test Score</span>
                <Award className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
                {latestAttempt ? `${latestAttempt.totalScore} / ${latestAttempt.maxScore}` : '84 / 100'}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                Physics FRT Revision Test
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
                <span>Cohort Batch Rank</span>
                <TrendingUp className="w-4 h-4 text-[#722F37]" />
              </div>
              <div className="text-3xl font-extrabold text-[#722F37] dark:text-[#ff99a8] mt-2">
                4 / 45
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Top 10% in Class 12 Batch A</div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
                <span>Attendance Rate</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
                66.7%
              </div>
              <div className="text-[11px] text-rose-500 mt-1 font-medium">2 tests marked Absent</div>
            </div>
          </div>

          {/* Child's Recent Test Log (Read-Only Table) */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  Ward Examination History
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Detailed breakdown of recent attempts and school batch comparative scores.
                </p>
              </div>
              <Link
                href="/report"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-700 hover:bg-stone-200 text-slate-700 dark:text-slate-200 text-xs font-semibold"
              >
                <BarChart2 className="w-3.5 h-3.5 text-[#722F37]" />
                <span>View Latest PAR Diagnostic</span>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-slate-700 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-3">Test Date</th>
                    <th className="py-3 px-3">Examination Name</th>
                    <th className="py-3 px-3">Subject</th>
                    <th className="py-3 px-3">Child&apos;s Score</th>
                    <th className="py-3 px-3">Batch Top Mark</th>
                    <th className="py-3 px-3">Batch Standing</th>
                    <th className="py-3 px-3 text-right">Report Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-slate-700/60">
                  <tr className="hover:bg-stone-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">29-Oct-2026</td>
                    <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">Physics FRT — Electrostatics</td>
                    <td className="py-3 px-3 text-slate-600">Physics</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">84 / 100</td>
                    <td className="py-3 px-3 text-slate-500">96 / 100</td>
                    <td className="py-3 px-3 font-bold text-[#722F37]">3 / 45</td>
                    <td className="py-3 px-3 text-right">
                      <Link href="/report" className="text-[#722F37] hover:underline font-semibold">PAR Report</Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">24-Oct-2026</td>
                    <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">Mathematics Diagnostic — Quadratics</td>
                    <td className="py-3 px-3 text-slate-600">Mathematics</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">56 / 60</td>
                    <td className="py-3 px-3 text-slate-500">60 / 60</td>
                    <td className="py-3 px-3 font-bold text-[#722F37]">2 / 44</td>
                    <td className="py-3 px-3 text-right">
                      <Link href="/ctr" className="text-[#722F37] hover:underline font-semibold">CTR Table</Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">15-Oct-2026</td>
                    <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">Chemistry Foundation — Periodic Table</td>
                    <td className="py-3 px-3 text-slate-600">Chemistry</td>
                    <td className="py-3 px-3 font-bold text-rose-600">Absent</td>
                    <td className="py-3 px-3 text-slate-500">56 / 60</td>
                    <td className="py-3 px-3 text-slate-400">—</td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-slate-400 italic">No Submission</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </RoleGuard>
  );
}

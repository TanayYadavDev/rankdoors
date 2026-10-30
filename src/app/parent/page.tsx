'use client';

import React from 'react';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';
import { UserCheck, ShieldCheck, FileSpreadsheet, BarChart2 } from 'lucide-react';

export default function ParentDashboardPlaceholder() {
  return (
    <RoleGuard allowedRole="parent">
      {(user) => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Parent Portal (Read-Only) • SPS Bhopal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                Parent Overview: {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Linked Student: <strong>{user.childName || 'Harsh Vardhan (Class 12 - Batch A)'}</strong>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/ctr"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold shadow-sm transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Open Child CTR Report</span>
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
              Transparent Student Progress Tracking
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-6">
              Parents have read-only access to their child&apos;s Cumulative Test Reports (CTR), including test dates, total marks, subject-wise scores, and cohort batch standings.
            </p>
            <Link
              href="/ctr"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 text-slate-800 dark:text-slate-100 text-xs font-semibold"
            >
              <BarChart2 className="w-4 h-4 text-[#722F37]" />
              <span>Inspect Cumulative Analytics</span>
            </Link>
          </div>
        </div>
      )}
    </RoleGuard>
  );
}

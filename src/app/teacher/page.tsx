'use client';

import React from 'react';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';
import { Users, FilePlus, BookOpen, BarChart3, Clock, Calendar } from 'lucide-react';

export default function TeacherDashboardPlaceholder() {
  return (
    <RoleGuard allowedRole="teacher">
      {(user) => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30">
                <Users className="w-3.5 h-3.5" />
                <span>Faculty Portal • SPS Bhopal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                Teacher Console: {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {user.department || 'Senior Secondary Wing'} • Saket Nagar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/questions"
                className="px-4 py-2 rounded-lg bg-stone-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold hover:bg-stone-300"
              >
                Browse Question Bank
              </Link>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Assigned Cohorts</div>
              <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">Class 11 & 12 (Batch A/B)</div>
              <div className="text-[11px] text-slate-400 mt-1">94 Enrolled Students</div>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Papers Scheduled</div>
              <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">4 Active Windows</div>
              <div className="text-[11px] text-slate-400 mt-1">Next window opens 05-Nov</div>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">TIPS Generator</div>
              <div className="text-2xl font-extrabold text-[#722F37] dark:text-[#ff99a8] mt-1">Ready</div>
              <div className="text-[11px] text-slate-400 mt-1">Teacher&apos;s Interface for Paper Setting</div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm text-center">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
              TIPS Paper Builder Console
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
              Full TIPS paper selection, syllabus curation, duration constraints, and test window scheduling are integrated in the upcoming step.
            </p>
            <Link
              href="/questions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold shadow-sm transition-colors"
            >
              <FilePlus className="w-4 h-4" />
              <span>Review Available Question Bank</span>
            </Link>
          </div>
        </div>
      )}
    </RoleGuard>
  );
}

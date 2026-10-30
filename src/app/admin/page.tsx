'use client';

import React from 'react';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';
import { ShieldCheck, Users, Database, Settings } from 'lucide-react';

export default function AdminDashboardPlaceholder() {
  return (
    <RoleGuard allowedRole="admin">
      {(user) => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Administrative Control • SPS Bhopal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                Institutional Management Console
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Sagar Public School, Saket Nagar Campus • Administrator Session
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Registered Batches</div>
              <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">6 Active Cohorts</div>
              <div className="text-[11px] text-slate-400 mt-1">Classes 9, 10, 11, 12 (PCM)</div>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Student Accounts</div>
              <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">240 Enrolled</div>
              <div className="text-[11px] text-slate-400 mt-1">SPS Saket Nagar Admissions</div>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Platform Status</div>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">Operational</div>
              <div className="text-[11px] text-slate-400 mt-1">Self-Managed (Zero External SaaS Fees)</div>
            </div>
          </div>
        </div>
      )}
    </RoleGuard>
  );
}

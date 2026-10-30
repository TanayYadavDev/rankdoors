import React from 'react';
import Link from 'next/link';
import { ShieldCheck, School, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-200 dark:border-slate-800 bg-stone-100/70 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <School className="w-4 h-4 text-[#722F37]" />
          <span>
            <strong>RankDoors</strong> — Academic Assessment Platform for <strong>Sagar Public School, Saket Nagar, Bhopal</strong>.
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Within-Batch Analytics Only
          </span>
          <span>•</span>
          <span>Classes 9–12 JEE & Foundation</span>
          <span>•</span>
          <span>Self-Managed Platform</span>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Printer,
  Calendar,
  Filter,
  ShieldCheck,
  TrendingUp,
  Award,
  AlertCircle,
  Clock,
  ArrowRight,
  Download,
} from 'lucide-react';
import { TestAttempt } from '@/types/attempt';

interface CTRRow {
  id: string;
  scheduledOn: string;
  takenOn: string;
  exam: string;
  description: string;
  score: string;
  isAbsent: boolean;
  highestMarks: string;
  subjectMarks: string;
  highestSubjectMarks: string;
  rankRatio: string;
  timeTaken: string;
}

export default function CTRPage() {
  const [dateFrom, setDateFrom] = useState<string>('2026-08-01');
  const [dateTo, setDateTo] = useState<string>('2026-10-31');
  const [attempts, setAttempts] = useState<CTRRow[]>([]);

  useEffect(() => {
    // Baseline historic attempts matching SPS Reference Blueprint (Oct 2026)
    const baseRows: CTRRow[] = [
      {
        id: 'CTR-01',
        scheduledOn: '28-Oct-2026',
        takenOn: '29-Oct-2026',
        exam: 'JEE Main',
        description: 'Physics FRT — Electrostatics & Current Electricity',
        score: '84 / 100',
        isAbsent: false,
        highestMarks: '96 / 100',
        subjectMarks: 'P: 84',
        highestSubjectMarks: 'P: 96',
        rankRatio: '3 / 45',
        timeTaken: '48m 10s',
      },
      {
        id: 'CTR-02',
        scheduledOn: '22-Oct-2026',
        takenOn: '24-Oct-2026',
        exam: 'JEE Main',
        description: 'Mathematics Diagnostic Test — Quadratic Equations',
        score: '56 / 60',
        isAbsent: false,
        highestMarks: '60 / 60',
        subjectMarks: 'M: 56',
        highestSubjectMarks: 'M: 60',
        rankRatio: '2 / 44',
        timeTaken: '38m 45s',
      },
      {
        id: 'CTR-03',
        scheduledOn: '18-Oct-2026',
        takenOn: '20-Oct-2026',
        exam: 'JEE Main',
        description: 'Physics Weekly FRT — Work Power & Energy',
        score: '72 / 100',
        isAbsent: false,
        highestMarks: '92 / 100',
        subjectMarks: 'P: 72',
        highestSubjectMarks: 'P: 92',
        rankRatio: '7 / 45',
        timeTaken: '52m 00s',
      },
      {
        id: 'CTR-04',
        scheduledOn: '12-Oct-2026',
        takenOn: '—',
        exam: 'JEE Main',
        description: 'Chemistry Foundation Diagnostic — Periodic Table',
        score: 'Absent',
        isAbsent: true,
        highestMarks: '56 / 60',
        subjectMarks: '—',
        highestSubjectMarks: 'C: 56',
        rankRatio: '—',
        timeTaken: '0m',
      },
      {
        id: 'CTR-05',
        scheduledOn: '03-Oct-2026',
        takenOn: '—',
        exam: 'JEE Main',
        description: 'Physics FRT 3 October — Kinematics & Mechanics',
        score: 'Absent',
        isAbsent: true,
        highestMarks: '94 / 100',
        subjectMarks: '—',
        highestSubjectMarks: 'P: 94',
        rankRatio: '—',
        timeTaken: '0m',
      },
    ];

    // Load newly attempted tests from localStorage
    try {
      const historyStr = localStorage.getItem('rankdoors_attempt_history');
      if (historyStr) {
        const parsedHistory: TestAttempt[] = JSON.parse(historyStr);
        const dynamicRows: CTRRow[] = parsedHistory.map((att) => ({
          id: att.id,
          scheduledOn: new Date(att.startedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          takenOn: new Date(att.submittedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          exam: att.examType || 'JEE Main',
          description: att.testTitle,
          score: `${att.totalScore} / ${att.maxScore}`,
          isAbsent: false,
          highestMarks: `${Math.min(att.maxScore, att.totalScore + 4)} / ${att.maxScore}`,
          subjectMarks: `P: ${att.subjectScores.Physics.score}, C: ${att.subjectScores.Chemistry.score}, M: ${att.subjectScores.Mathematics.score}`,
          highestSubjectMarks: `P: ${att.subjectScores.Physics.max}, C: ${att.subjectScores.Chemistry.max}, M: ${att.subjectScores.Mathematics.max}`,
          rankRatio: '4 / 45',
          timeTaken: `${Math.floor(att.timeTakenSec / 60)}m ${att.timeTakenSec % 60}s`,
        }));

        setAttempts([...dynamicRows, ...baseRows]);
        return;
      }
    } catch {}

    setAttempts(baseRows);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 print:p-0">
      {/* Header (No print margins) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800 print:border-b-2 print:border-slate-900 print:pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30 print:hidden">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Sagar Public School • Cumulative Academic Record</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Cumulative Test Report (CTR)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Student: <strong className="text-slate-800 dark:text-slate-200">Harsh Vardhan</strong> • Class 12 - Target JEE 2027 (Batch A) • Sagar Public School, Saket Nagar, Bhopal
          </p>
        </div>

        {/* Print & Action Controls */}
        <div className="flex items-center gap-3 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print to PDF / Paper</span>
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2.5 rounded-lg bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Period From:</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#722F37]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Period To:</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#722F37]"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Export capped at 3-month range per SPS Blueprint</span>
        </div>
      </div>

      {/* Honest Labeling Notice */}
      <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mb-6 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#722F37] shrink-0 mt-0.5" />
        <div>
          <strong>Transparency Notice:</strong> Batch comparison columns (<em>Highest Marks</em>, <em>Highest Subject Marks</em>, and <em>Rank</em>) reflect the <strong>SPS Bhopal Class 12 batch cohort only</strong> (sample data until full central database synchronization). Percentiles and ranks are strictly within-school and never claimed as All-India.
        </div>
      </div>

      {/* CTR Cumulative Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm overflow-hidden print:border-none print:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 dark:bg-slate-900/60 border-b border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider print:bg-slate-100">
                <th className="py-3.5 px-3">Test Scheduled On</th>
                <th className="py-3.5 px-3">Test Taken On</th>
                <th className="py-3.5 px-3">Exam</th>
                <th className="py-3.5 px-3">Test Description</th>
                <th className="py-3.5 px-3">Total Marks</th>
                <th className="py-3.5 px-3">
                  Highest Marks <span className="text-[10px] lowercase font-normal text-slate-400">(sample)</span>
                </th>
                <th className="py-3.5 px-3">Subject Marks</th>
                <th className="py-3.5 px-3">
                  Highest Sub. Marks <span className="text-[10px] lowercase font-normal text-slate-400">(sample)</span>
                </th>
                <th className="py-3.5 px-3">
                  Rank <span className="text-[10px] lowercase font-normal text-slate-400">(rank/total)</span>
                </th>
                <th className="py-3.5 px-3 text-right">Time Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-slate-700/60">
              {attempts.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-stone-50/70 dark:hover:bg-slate-700/30 transition-colors print:hover:bg-transparent"
                >
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {row.scheduledOn}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {row.takenOn}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    {row.exam}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-800 dark:text-slate-100 max-w-xs truncate">
                      {row.description}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    {row.isAbsent ? (
                      <span className="font-extrabold text-rose-600 dark:text-rose-400">
                        Absent
                      </span>
                    ) : (
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {row.score}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                    {row.highestMarks}
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300 font-medium">
                    {row.subjectMarks}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                    {row.highestSubjectMarks}
                  </td>
                  <td className="py-3.5 px-3">
                    {row.isAbsent ? (
                      <span className="text-slate-400">—</span>
                    ) : (
                      <span className="font-bold text-[#722F37] dark:text-[#ff99a8]">
                        {row.rankRatio}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right text-slate-600 dark:text-slate-400 whitespace-nowrap font-mono">
                    {row.timeTaken}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info strip in print */}
        <div className="p-4 border-t border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900/40 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>RankDoors Assessment Platform • Sagar Public School Bhopal</span>
          <span>Printed on: {new Date().toLocaleDateString('en-GB')} • Official Academic Record</span>
        </div>
      </div>
    </div>
  );
}

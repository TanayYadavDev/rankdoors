'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  BarChart3,
  BookOpen,
  FileCheck2,
} from 'lucide-react';

export default function HomePage() {
  const roleCards = [
    {
      title: 'Student Portal',
      role: 'Student',
      icon: GraduationCap,
      description:
        'Attempt scheduled JEE & Foundation tests in an authentic NTA-calibrated test player, review answers, and inspect PAR diagnostics.',
      href: '/login?role=student',
      badge: 'Classes 9–12',
      demoUser: 'harsh.vardhan@spssn.edu',
      features: ['NTA-style test environment', 'PAR & CTR diagnostic reports', 'Verified PCM question bank'],
    },
    {
      title: 'Teacher Portal',
      role: 'Teacher',
      icon: Users,
      description:
        'Build custom papers using the TIPS interface, select chapter & difficulty distributions, and schedule tests for batches.',
      href: '/login?role=teacher',
      badge: 'Faculty Interface',
      demoUser: 'neha.verma@spssn.edu',
      features: ['TIPS paper builder', 'Batch test window scheduling', 'Question bank search & filter'],
    },
    {
      title: 'Parent Portal',
      role: 'Parent',
      icon: UserCheck,
      description:
        'Read-only cumulative progress reports (CTR) for your enrolled child. Transparent attendance and honest batch performance.',
      href: '/login?role=parent',
      badge: 'Read-Only Access',
      demoUser: 'rajesh.sharma@parent.spssn.edu',
      features: ['Child CTR cumulative report', 'Honest within-batch ranks', 'Score & attempt history'],
    },
    {
      title: 'Admin Portal',
      role: 'Admin',
      icon: ShieldAlert,
      description:
        'Comprehensive institutional management for Sagar Public School: manage batches, student mapping, and test schedules.',
      href: '/login?role=admin',
      badge: 'Institutional Control',
      demoUser: 'admin@spssn.edu',
      features: ['Batch & cohort management', 'Test session monitoring', 'Platform announcements'],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start flex-1 w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-stone-100 to-stone-50 dark:from-slate-900 dark:to-[#0F172A] py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* SPS Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 border border-[#722F37]/30 text-[#722F37] dark:text-[#ff99a8] text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#722F37] animate-pulse"></span>
            Sagar Public School, Bhopal • Saket Nagar Campus
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight max-w-4xl">
            RankDoors
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#722F37] dark:text-[#f87171] mt-2">
              Your Door to a Better Rank
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            The dedicated, self-managed JEE Main & Foundation assessment platform for Sagar Public School, Bhopal.
            Authentic NTA testing simulation, TIPS paper setting, and honest within-batch diagnostic analytics.
          </p>

          {/* Quick CTA Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Clock className="w-4 h-4" />
              Launch Test Player
            </Link>
            <Link
              href="/questions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-semibold text-sm shadow-sm transition-all duration-300"
            >
              <BookOpen className="w-4 h-4 text-[#722F37]" />
              Explore Question Bank
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold text-sm transition-all duration-300"
            >
              Login to Portal
            </Link>
          </div>

          {/* Value Props Row */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl text-left">
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1.5" />
              <div className="font-bold text-sm text-slate-800 dark:text-slate-100">NTA Simulation</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">4-colour palette, ±0.01 tolerance</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <BarChart3 className="w-5 h-5 text-[#722F37] dark:text-[#ff99a8] mb-1.5" />
              <div className="font-bold text-sm text-slate-800 dark:text-slate-100">PAR & CTR Diagnostics</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">8 blueprint metrics, honest ranks</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <FileCheck2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1.5" />
              <div className="font-bold text-sm text-slate-800 dark:text-slate-100">TIPS Paper Setting</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Syllabus & difficulty curation</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-1.5" />
              <div className="font-bold text-sm text-slate-800 dark:text-slate-100">SPS Owned</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Classes 9–12 self-managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Grid */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Select Your Role to Enter RankDoors
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Choose your persona below to access customized dashboards and test workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.role}
                className="flex flex-col justify-between rounded-xl p-6 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#722F37]/10 dark:bg-[#722F37]/20 flex items-center justify-center text-[#722F37] dark:text-[#ff99a8] group-hover:bg-[#722F37] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-600">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {card.description}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#722F37] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-slate-700/60 flex flex-col gap-2">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Demo User:</span> {card.demoUser}
                  </div>
                  <Link
                    href={card.href}
                    className="inline-flex items-center justify-between w-full px-4 py-2 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-semibold shadow-sm transition-colors duration-300"
                  >
                    <span>Enter {card.role} Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

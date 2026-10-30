'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { demoAccounts, DemoUser } from '@/data/demoAccounts';
import {
  GraduationCap,
  Users,
  UserCheck,
  ShieldCheck,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  School,
  Lock,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedRole = searchParams.get('role');

  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeRoleTab, setActiveRoleTab] = useState<string>(preselectedRole || 'student');

  useEffect(() => {
    // autofill demo account when clicking quick role buttons
    const found = demoAccounts.find((a) => a.role === activeRoleTab);
    if (found) {
      setLoginId(found.loginId);
      setPassword('password123');
      setErrorMsg('');
    }
  }, [activeRoleTab]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const account = demoAccounts.find(
      (a) =>
        (a.loginId.toLowerCase() === loginId.trim().toLowerCase() ||
          a.email.toLowerCase() === loginId.trim().toLowerCase()) &&
        a.passwordHash === password
    );

    if (!account) {
      setErrorMsg('Invalid login credentials. Use any demo role button or password: password123');
      return;
    }

    // Save session in localStorage WITHOUT password
    const sessionData = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      classBatch: account.classBatch,
      department: account.department,
      childName: account.childName,
      loginTimestamp: new Date().toISOString(),
      keepLoggedIn,
    };

    localStorage.setItem('rankdoors_auth', JSON.stringify(sessionData));

    // Redirect based on role
    if (account.role === 'teacher') {
      router.push('/teacher');
    } else if (account.role === 'parent') {
      router.push('/parent');
    } else if (account.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-xl transition-colors duration-300">
        {/* SPS Crest & Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#722F37] text-white flex items-center justify-center font-extrabold text-2xl mx-auto shadow-md border border-white/20 mb-3">
            RD
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] uppercase tracking-wider">
            Sagar Public School, Bhopal
          </span>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
            RankDoors Portal Login
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in with your registered school identity
          </p>
        </div>

        {/* 1-Click Demo Persona Tabs */}
        <div className="mb-6">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Select Role Demo Persona (1-Click Fill):
          </div>
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-lg bg-stone-100 dark:bg-slate-700/60 text-xs">
            {(['student', 'teacher', 'parent', 'admin'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRoleTab(r)}
                className={`py-1.5 rounded-md font-semibold capitalize transition-all ${
                  activeRoleTab === r
                    ? 'bg-[#722F37] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              User Id / Email / Contact
            </label>
            <input
              type="text"
              required
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="e.g. harsh.vardhan@spssn.edu"
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#722F37] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Keep me logged in */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="rounded text-[#722F37] focus:ring-[#722F37] w-4 h-4 cursor-pointer"
              />
              <span>Keep Me Logged In</span>
            </label>
            <span className="text-[11px] text-slate-400">Default: password123</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>LOGIN</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-slate-700/60 text-center text-[11px] text-slate-500">
          RankDoors • Sagar Public School Saket Nagar Bhopal
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading login portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, LogIn, ArrowRight } from 'lucide-react';
import { DemoUser } from '@/data/demoAccounts';

interface RoleGuardProps {
  allowedRole: 'student' | 'teacher' | 'parent' | 'admin';
  children: (user: DemoUser) => React.ReactNode;
}

export default function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const rawAuth = localStorage.getItem('rankdoors_auth');
    if (rawAuth) {
      try {
        const parsed = JSON.parse(rawAuth);
        if (parsed && parsed.role === allowedRole) {
          setUser(parsed);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setChecked(true);
  }, [allowedRole]);

  if (!checked) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="animate-pulse text-xs font-semibold text-slate-500">
          Checking authorization...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-md text-center">
        <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Please Login First
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          You must be authenticated with a <strong className="capitalize text-slate-800 dark:text-slate-200">{allowedRole}</strong> account to access this portal.
        </p>
        <Link
          href={`/login?role=${allowedRole}`}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
        >
          <LogIn className="w-4 h-4" />
          <span>Login to {allowedRole} Portal</span>
        </Link>
      </div>
    );
  }

  return <>{children(user)}</>;
}

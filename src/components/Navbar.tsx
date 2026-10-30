'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GraduationCap, ShieldCheck, UserCheck, BookOpen, FileSpreadsheet, LayoutDashboard, LogOut, LogIn } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem('rankdoors_auth');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('rankdoors_auth');
    setCurrentUser(null);
    router.push('/login');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/questions', label: 'Question Bank' },
    { href: '/test', label: 'Test Player' },
    { href: '/report', label: 'PAR Report' },
    { href: '/ctr', label: 'CTR Report' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-[#451E24] dark:bg-[#38161C] text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & School Crest */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-[#722F37] border border-white/20 flex items-center justify-center font-bold text-xl tracking-tight text-white group-hover:scale-105 transition-transform">
                RD
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                  RankDoors
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#722F37] text-white/90 font-medium tracking-normal border border-white/20">
                    SPS Saket Nagar
                  </span>
                </span>
                <span className="text-[11px] text-stone-300 tracking-wide">
                  Sagar Public School, Bhopal
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#722F37] text-white font-semibold'
                      : 'text-stone-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: User Menu / Login */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href={
                    currentUser.role === 'teacher'
                      ? '/teacher'
                      : currentUser.role === 'parent'
                      ? '/parent'
                      : currentUser.role === 'admin'
                      ? '/admin'
                      : '/dashboard'
                  }
                  className="flex items-center gap-2 px-3 py-1 rounded bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-semibold border border-white/20 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span className="capitalize">{currentUser.role} Portal</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-stone-200 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-semibold bg-[#722F37] hover:bg-[#5F272E] text-white shadow-sm transition-colors border border-white/20"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

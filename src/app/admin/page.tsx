'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';
import {
  ShieldCheck,
  Users,
  Database,
  School,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Layers,
  GraduationCap,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface BatchItem {
  id: string;
  name: string;
  classLevel: number;
  studentsCount: number;
  facultyMentor: string;
  examStream: string;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent';
  info: string;
  status: 'Active' | 'Pending';
}

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<'batches' | 'users'>('batches');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample Batches
  const [batches, setBatches] = useState<BatchItem[]>([
    {
      id: 'BAT-12A',
      name: 'Class 12 - Target JEE 2027 (Batch A)',
      classLevel: 12,
      studentsCount: 45,
      facultyMentor: 'Dr. Neha Verma',
      examStream: 'JEE Main + Advanced',
    },
    {
      id: 'BAT-12B',
      name: 'Class 12 - Target JEE 2027 (Batch B)',
      classLevel: 12,
      studentsCount: 42,
      facultyMentor: 'Mr. Arvind Saxena',
      examStream: 'JEE Main + Advanced',
    },
    {
      id: 'BAT-11A',
      name: 'Class 11 - JEE Foundation (Batch A)',
      classLevel: 11,
      studentsCount: 50,
      facultyMentor: 'Mrs. Sunita Rao',
      examStream: 'JEE Foundation',
    },
    {
      id: 'BAT-11B',
      name: 'Class 11 - JEE Foundation (Batch B)',
      classLevel: 11,
      studentsCount: 48,
      facultyMentor: 'Mr. Rajesh Tiwari',
      examStream: 'JEE Foundation',
    },
    {
      id: 'BAT-10A',
      name: 'Class 10 - Foundation Achievers',
      classLevel: 10,
      studentsCount: 35,
      facultyMentor: 'Mrs. Priya Nair',
      examStream: 'JEE Foundation (Maths/Science)',
    },
    {
      id: 'BAT-09A',
      name: 'Class 9 - Junior Foundation',
      classLevel: 9,
      studentsCount: 30,
      facultyMentor: 'Mr. Deepak Mishra',
      examStream: 'JEE Foundation (Maths/Science)',
    },
  ]);

  // Sample Users
  const [usersList, setUsersList] = useState<UserItem[]>([
    {
      id: 'usr-101',
      name: 'Harsh Vardhan',
      email: 'harsh.vardhan@spssn.edu',
      role: 'student',
      info: 'Class 12 - Target JEE 2027 (Batch A)',
      status: 'Active',
    },
    {
      id: 'usr-102',
      name: 'Dr. Neha Verma',
      email: 'neha.verma@spssn.edu',
      role: 'teacher',
      info: 'Senior Physics Faculty',
      status: 'Active',
    },
    {
      id: 'usr-103',
      name: 'Mr. Rajesh Sharma',
      email: 'rajesh.sharma@parent.spssn.edu',
      role: 'parent',
      info: 'Parent of Harsh Vardhan',
      status: 'Active',
    },
    {
      id: 'usr-104',
      name: 'Aanya Patel',
      email: 'aanya.patel@spssn.edu',
      role: 'student',
      info: 'Class 12 - Target JEE 2027 (Batch A)',
      status: 'Active',
    },
    {
      id: 'usr-105',
      name: 'Mr. Arvind Saxena',
      email: 'arvind.saxena@spssn.edu',
      role: 'teacher',
      info: 'Senior Mathematics Faculty',
      status: 'Active',
    },
    {
      id: 'usr-106',
      name: 'Rohan Gupta',
      email: 'rohan.gupta@spssn.edu',
      role: 'student',
      info: 'Class 11 - JEE Foundation (Batch A)',
      status: 'Active',
    },
  ]);

  // New Batch Form State
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchClass, setNewBatchClass] = useState<number>(12);
  const [newBatchMentor, setNewBatchMentor] = useState('');
  const [newBatchStream, setNewBatchStream] = useState('JEE Main');
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;

    const newBatch: BatchItem = {
      id: `BAT-${Date.now().toString().slice(-4)}`,
      name: newBatchName,
      classLevel: newBatchClass,
      studentsCount: 0,
      facultyMentor: newBatchMentor || 'Faculty Unassigned',
      examStream: newBatchStream,
    };

    setBatches([newBatch, ...batches]);
    setNewBatchName('');
    setNewBatchMentor('');
    setShowAddBatchModal(false);
  };

  // Filtered Users
  const filteredUsers = usersList.filter((u) => {
    if (userRoleFilter !== 'All' && u.role !== userRoleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.info.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <RoleGuard allowedRole="admin">
      {(user) => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#722F37]/10 dark:bg-[#722F37]/20 text-[#722F37] dark:text-[#ff99a8] mb-2 border border-[#722F37]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Institutional Administration • Sagar Public School Bhopal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                System Administration & Batch Controls
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Saket Nagar Campus • Self-Managed Academic Infrastructure (Zero External SaaS Fees)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAddBatchModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold shadow-sm transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Batch</span>
              </button>
            </div>
          </div>

          {/* Institutional Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Active Batches</div>
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{batches.length}</div>
              <div className="text-[11px] text-slate-400 mt-1">Classes 9 to 12</div>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Total Enrolled</div>
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                {batches.reduce((sum, b) => sum + b.studentsCount, 0)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">SPS Saket Nagar Students</div>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Faculty Accounts</div>
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">12</div>
              <div className="text-[11px] text-slate-400 mt-1">TIPS Paper Setters</div>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Vendor Costs</div>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">₹0</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">100% Self-Managed</div>
            </div>
          </div>

          {/* Navigation Tabs: Batches vs Users */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-stone-100 dark:bg-slate-700/60 mb-6 max-w-xs text-xs font-bold">
            <button
              onClick={() => setActiveTab('batches')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeTab === 'batches'
                  ? 'bg-[#722F37] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Batch Cohorts ({batches.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeTab === 'users'
                  ? 'bg-[#722F37] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              User Accounts ({usersList.length})
            </button>
          </div>

          {/* TAB 1: BATCHES MANAGEMENT */}
          {activeTab === 'batches' && (
            <div className="rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  School Batch Management
                </h2>
                <span className="text-xs text-slate-500">
                  Total student capacity configured
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-slate-700 text-slate-500 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-3">Batch Code</th>
                      <th className="py-3 px-3">Cohort Name</th>
                      <th className="py-3 px-3">Class</th>
                      <th className="py-3 px-3">Target Exam Stream</th>
                      <th className="py-3 px-3">Enrolled Students</th>
                      <th className="py-3 px-3">Faculty Mentor</th>
                      <th className="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-slate-700/60">
                    {batches.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50 dark:hover:bg-slate-700/30">
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-500">{b.id}</td>
                        <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-100">{b.name}</td>
                        <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">Class {b.classLevel}</td>
                        <td className="py-3.5 px-3 font-medium text-slate-600 dark:text-slate-400">{b.examStream}</td>
                        <td className="py-3.5 px-3 font-bold text-[#722F37] dark:text-[#ff99a8]">{b.studentsCount} Students</td>
                        <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">{b.facultyMentor}</td>
                        <td className="py-3.5 px-3 text-right">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 text-[10px] font-bold">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: USERS MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm p-6">
              {/* Filter Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500">Filter Role:</span>
                  {['All', 'student', 'teacher', 'parent'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setUserRoleFilter(role)}
                      className={`px-3 py-1 rounded-md capitalize font-semibold transition-all ${
                        userRoleFilter === role
                          ? 'bg-[#722F37] text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-stone-200'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <div className="w-full sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Search user by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-slate-700 text-slate-500 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-3">User ID</th>
                      <th className="py-3 px-3">Name</th>
                      <th className="py-3 px-3">Email Address</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3">Academic Mapping</th>
                      <th className="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-slate-700/60">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-50 dark:hover:bg-slate-700/30">
                        <td className="py-3 px-3 font-mono font-bold text-slate-500">{u.id}</td>
                        <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">{u.name}</td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{u.email}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full capitalize font-semibold text-[10px] ${
                              u.role === 'student'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : u.role === 'teacher'
                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{u.info}</td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Create Batch Modal */}
          {showAddBatchModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl border border-stone-200 dark:border-slate-700">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Create New Student Cohort Batch
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Define a new student cohort for targeted test scheduling and TIPS paper delivery.
                </p>

                <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Batch Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newBatchName}
                      onChange={(e) => setNewBatchName(e.target.value)}
                      placeholder="e.g. Class 12 - Target JEE 2027 (Batch C)"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Class Level
                    </label>
                    <select
                      value={newBatchClass}
                      onChange={(e) => setNewBatchClass(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900"
                    >
                      <option value={12}>Class 12</option>
                      <option value={11}>Class 11</option>
                      <option value={10}>Class 10</option>
                      <option value={9}>Class 9</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Target Exam Stream
                    </label>
                    <select
                      value={newBatchStream}
                      onChange={(e) => setNewBatchStream(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900"
                    >
                      <option value="JEE Main">JEE Main</option>
                      <option value="JEE Main + Advanced">JEE Main + Advanced</option>
                      <option value="JEE Foundation (Maths/Science)">JEE Foundation (Maths/Science)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Faculty Mentor
                    </label>
                    <input
                      type="text"
                      value={newBatchMentor}
                      onChange={(e) => setNewBatchMentor(e.target.value)}
                      placeholder="e.g. Dr. Neha Verma"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 bg-stone-50 dark:bg-slate-900"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setShowAddBatchModal(false)}
                      className="px-4 py-2 rounded-lg bg-stone-200 dark:bg-slate-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#722F37] hover:bg-[#5F272E] text-white text-xs font-bold"
                    >
                      Save Batch
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </RoleGuard>
  );
}

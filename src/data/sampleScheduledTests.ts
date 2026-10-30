export interface ScheduledTest {
  id: string;
  name: string;
  scheduledBy: string;
  subject: string;
  windowStart: string;
  windowEnd: string;
  durationMin: number;
  status: 'active' | 'upcoming' | 'missed' | 'completed' | 'left_in_between';
  description: string;
  score?: string;
  comments?: string;
}

export const sampleScheduledTests: ScheduledTest[] = [
  // Active Test (open currently within window)
  {
    id: 'SCH-101',
    name: 'Physics FRT — Electrostatics & Current Electricity',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'Physics',
    windowStart: '28-Oct-2026 09:00 AM',
    windowEnd: '05-Nov-2026 11:30 PM',
    durationMin: 60,
    status: 'active',
    description: 'Class 12 JEE Main Full Revision Test with numerical input section.',
    comments: 'Attempt before window closes.',
  },
  {
    id: 'SCH-102',
    name: 'Mathematics Chapter Test — Definite Integration',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'Mathematics',
    windowStart: '30-Oct-2026 10:00 AM',
    windowEnd: '04-Nov-2026 05:00 PM',
    durationMin: 45,
    status: 'active',
    description: 'Calculus property problems with +4/-1 JEE scheme.',
    comments: 'Focus on King’s and Queen’s properties.',
  },

  // Upcoming Test (window opens in future)
  {
    id: 'SCH-103',
    name: 'Chemistry Full Mock — Organic Hydrocarbons & VSEPR',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'Chemistry',
    windowStart: '05-Nov-2026 09:00 AM',
    windowEnd: '08-Nov-2026 06:00 PM',
    durationMin: 60,
    status: 'upcoming',
    description: 'Comprehensive test covering chemical bonding and reaction mechanisms.',
    comments: 'Window opens Nov 5.',
  },
  {
    id: 'SCH-104',
    name: 'JEE Main Grand Simulator — Paper 1 (PCM)',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'PCM Full Syllabus',
    windowStart: '10-Nov-2026 08:30 AM',
    windowEnd: '12-Nov-2026 08:30 PM',
    durationMin: 180,
    status: 'upcoming',
    description: 'All-SPS Bhopal inter-class competitive benchmark test.',
    comments: 'Strict 3-hour timer simulation.',
  },

  // Missed Tests (window ended, not attempted)
  {
    id: 'SCH-105',
    name: 'Physics FRT 3 October — Kinematics & Mechanics',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'Physics',
    windowStart: '01-Oct-2026 12:45 PM',
    windowEnd: '04-Oct-2026 12:30 PM',
    durationMin: 60,
    status: 'missed',
    description: 'Target test window closed without submission.',
    score: 'Absent (0 / 100)',
    comments: 'Unattempted — marked Absent.',
  },
  {
    id: 'SCH-106',
    name: 'Chemistry Foundation Diagnostic — Periodic Table',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'Chemistry',
    windowStart: '12-Oct-2026 10:00 AM',
    windowEnd: '15-Oct-2026 06:00 PM',
    durationMin: 45,
    status: 'missed',
    description: 'Periodic properties & electron configuration test.',
    score: 'Absent (0 / 60)',
    comments: 'Window elapsed.',
  },

  // Completed Tests
  {
    id: 'SCH-107',
    name: 'Physics Weekly FRT — Work Power & Energy',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'Physics',
    windowStart: '18-Oct-2026 09:00 AM',
    windowEnd: '21-Oct-2026 05:00 PM',
    durationMin: 60,
    status: 'completed',
    description: 'Class 12 batch mock test.',
    score: '84 / 100',
    comments: 'Score recorded in CTR.',
  },
  {
    id: 'SCH-108',
    name: 'Mathematics Diagnostic Test — Quadratic Equations',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'Mathematics',
    windowStart: '22-Oct-2026 09:00 AM',
    windowEnd: '25-Oct-2026 05:00 PM',
    durationMin: 45,
    status: 'completed',
    description: 'Roots, discriminant, and inequality assessment.',
    score: '56 / 60',
    comments: 'Verified in PAR analysis.',
  },

  // Left In Between
  {
    id: 'SCH-109',
    name: 'Chemistry Practice Series — Chemical Equilibrium',
    scheduledBy: 'Sagar Public School - Saket Nagar',
    subject: 'Chemistry',
    windowStart: '24-Oct-2026 11:00 AM',
    windowEnd: '27-Oct-2026 08:00 PM',
    durationMin: 45,
    status: 'left_in_between',
    description: 'Session exited prematurely prior to final submission.',
    score: 'Incomplete (12 / 60)',
    comments: 'Reopening closed per examination policy.',
  },
];

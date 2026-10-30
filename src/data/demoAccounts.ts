export interface DemoUser {
  id: string;
  loginId: string;
  email: string;
  passwordHash: string; // checked in memory, NEVER stored in session
  name: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  classBatch?: string;
  childName?: string;
  department?: string;
}

export const demoAccounts: DemoUser[] = [
  {
    id: 'usr_std_01',
    loginId: 'harsh.vardhan@spssn.edu',
    email: 'harsh.vardhan@spssn.edu',
    passwordHash: 'password123',
    name: 'Harsh Vardhan',
    role: 'student',
    classBatch: 'Class 12 - Target JEE 2027 (Batch A)',
  },
  {
    id: 'usr_tch_01',
    loginId: 'neha.verma@spssn.edu',
    email: 'neha.verma@spssn.edu',
    passwordHash: 'password123',
    name: 'Dr. Neha Verma',
    role: 'teacher',
    department: 'Department of Physics, Senior Wing',
  },
  {
    id: 'usr_par_01',
    loginId: 'rajesh.sharma@parent.spssn.edu',
    email: 'rajesh.sharma@parent.spssn.edu',
    passwordHash: 'password123',
    name: 'Mr. Rajesh Sharma',
    role: 'parent',
    childName: 'Harsh Vardhan (Class 12 - Batch A)',
  },
  {
    id: 'usr_adm_01',
    loginId: 'admin@spssn.edu',
    email: 'admin@spssn.edu',
    passwordHash: 'password123',
    name: 'SPS Academic Administration',
    role: 'admin',
    department: 'Academic & Examination Cell, SPS Bhopal',
  },
];

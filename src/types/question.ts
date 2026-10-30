export type Subject = 'Physics' | 'Chemistry' | 'Mathematics';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionType = 'mcq_single' | 'numerical';

export type ExamPattern = 'JEE Main' | 'JEE Foundation';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface Question {
  id: string;
  subject: Subject;
  chapter: string;
  topic: string;
  classLevel: 9 | 10 | 11 | 12;
  type: QuestionType;
  difficulty: Difficulty;
  pattern: ExamPattern;
  pyqYear: number | null;
  pyqTag: string | null; // ONLY for verified actual previous year questions
  body: string;
  options?: QuestionOption[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D' or numerical string '25'
  numericalAnswer?: number;
  numericalTolerance?: number; // ±0.01
  solution: string;
  targetTimeSeconds: number; // e.g., 120s
}

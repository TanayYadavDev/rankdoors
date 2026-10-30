export type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_review';

export interface AttemptAnswer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
  marks: number; // +4, -1, 0
  timeSpentSec: number;
  viewCount: number;
  markedReview: boolean;
  status: QuestionStatus;
}

export interface AttemptMetrics {
  totalQuestions: number;
  answered: number;
  correct: number;
  correctWithinTargetTime: number;
  incorrect: number;
  visitedNotAnswered: number;
  notVisited: number;
  viewedMoreThanTwice: number;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  examType: string;
  studentName: string;
  studentEmail: string;
  startedAt: string;
  submittedAt: string;
  totalScore: number;
  maxScore: number;
  timeTakenSec: number;
  submissionType: 'manual' | 'auto_timer';
  answers: Record<string, AttemptAnswer>;
  metrics: AttemptMetrics;
  subjectScores: {
    Physics: { score: number; max: number; correct: number; incorrect: number };
    Chemistry: { score: number; max: number; correct: number; incorrect: number };
    Mathematics: { score: number; max: number; correct: number; incorrect: number };
  };
}

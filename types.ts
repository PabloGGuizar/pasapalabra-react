
export interface Question {
  letter: string;
  clue: string;
  answer: string;
}

export type AnswerStatus = 'pending' | 'correct' | 'incorrect' | 'passed';

export interface QuestionWithStatus extends Question {
  status: AnswerStatus;
}

export type Theme = 'light' | 'dark' | 'system';

export interface RoscoItem {
  letter: string;
  status: AnswerStatus;
  isCurrent: boolean;
}

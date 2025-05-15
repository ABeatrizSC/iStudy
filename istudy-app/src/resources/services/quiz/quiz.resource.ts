export interface Option {
  id: string;
  option: string;
  createdBy: string;
  isCorrect: boolean;
}

export interface OptionRequest {
  option: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  createdBy: string;
  optionChosen: string,
  correctAnswer: boolean,
  quizId: string,
  options: Option[]
}

export interface QuestionAnswer {
  id: string;
  optionChosen: string;
}

export interface QuestionRequest {
  question: string;
  options: OptionRequest[];
}

export interface Quiz {
  id: string;
  createdBy: string;
  title: string;
  questions: Question[];
}

export interface QuizAnswer {
  questions: QuestionAnswer[];
}

export interface QuizRequest {
  title: string;
  questions: QuestionRequest[];
}
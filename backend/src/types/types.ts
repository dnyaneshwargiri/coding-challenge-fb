export type User = {
  userId: number;
  userName: string;
};

export type UserResponses = {
  responseId?: number;
  user: User;
  responses: QuestionResponseModel[];
};

export type QuestionResponseModel = {
  id?: number;
  question: Question;
  answer: string;
};

export type Question = {
  questionId: number;
  type: string;
  label: string;
  options?: string[];
  minValue?: number;
  maxValue?: number;
};

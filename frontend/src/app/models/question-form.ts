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

export type Recommendation = {
  id?: number;
  value: string;
  weight: number;
};

export type User = {
  userId?: number;
  userName: string;
};

export type UserResponses = {
  responseId?: number;
  user: User;
  responses: QuestionResponseModel[];
};

export type RecommendationOutput = {
  createUserResponses: string;
};

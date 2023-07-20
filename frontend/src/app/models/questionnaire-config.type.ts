export type QuestionnaireConfig = {
  id?:number,
  title?:string
  pages: Page[];
};

export type Page = {
  pageId: number;
  title: string;
  inputs: (Input | ButtonInput)[];
  conditionalNavigation?: ConditionalNavigation;
};

export type Input = {
  type: "text" | "checkbox" | "radio" | "recommendation";
  label: string;
  name: string;
  required?: boolean;
  options?: string[];
  recommendationValue?: string;
  condition?: ConditionalCheck;
};

export type ButtonInput = {
  type: "button";
  label: string;
  action: string;
  condition?: ConditionalCheck;
};

export type ConditionalNavigation = {
  conditions: ConditionalCheck[];
  targetPageId: number;
};

export type ConditionalCheck = {
  type?: string;
  sourceQuestion: string;
  requiredValue: string | boolean | string[];
};

export type FormData = {
  [key: string]: any;
};

export type QuestionnaireConfig = {
  pages: Page[];
};

export type Page = {
  pageId: number;
  title: string;
  inputs: (Input | ButtonInput)[];
  conditionalNavigation?: ConditionalNavigation;
};

export type Input = {
  type: "text" | "checkbox" | "radio";
  label: string;
  name: string;
  required?: boolean;
  options?: string[];
  condition?:ConditionalCheck
};

export type ButtonInput = {
  type: "button";
  label: string;
  action: string;
  condition?:ConditionalCheck
};

export type ConditionalNavigation = {
  conditions: ConditionalCheck[];
  targetPageId: number;
};

export type ConditionalCheck = {
  sourceQuestion: string;
  requiredValue: string | boolean;
};

export type FormData = {
  [key: string]: any;
};

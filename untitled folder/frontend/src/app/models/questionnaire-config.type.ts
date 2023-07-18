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
};

export type ButtonInput = {
  type: "button";
  label: string;
  action: string;
};

export type ConditionalNavigation = {
  sourceQuestion: string;
  requiredValue: string;
  targetPageId: number;
};

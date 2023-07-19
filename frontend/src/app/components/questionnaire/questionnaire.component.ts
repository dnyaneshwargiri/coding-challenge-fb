import { Component, Input } from "@angular/core";
import {
  QuestionnaireConfig,
  Page,
  FormData,
  Input as InputConfig,
  ConditionalCheck,
  ButtonInput
} from "../../models/questionnaire-config.type";

@Component({
  selector: "app-questionnaire",
  templateUrl: "./questionnaire.component.html",
  styleUrls: ["./questionnaire.component.css"],
})
export class QuestionnaireComponent {
  @Input() questionnaireConfig: QuestionnaireConfig = { pages: [] };
  currentPageIndex: number = 0;
  formData: FormData = {};
  goToNextPage() {
    const currentPage = this.questionnaireConfig.pages[this.currentPageIndex];
    const nextPageIndex = this.currentPageIndex + 1;

    if (this.isPageAccessible(currentPage)) {
      let nextAccessiblePageIndex =
        this.getNextAccessiblePageIndex(nextPageIndex);
      if (nextAccessiblePageIndex !== null) {
        this.currentPageIndex = nextAccessiblePageIndex;
      } else {
        console.log("No accessible page found based on the input.");
      }
    } else {
      console.log("Current page is not accessible based on the input.");
    }
  }

  goToPreviousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  getNextAccessiblePageIndex(startIndex: number): number | null {
    if (startIndex >= this.questionnaireConfig.pages.length) {
      return null;
    }

    for (let i = startIndex; i < this.questionnaireConfig.pages.length; i++) {
      const nextPage = this.questionnaireConfig.pages[i];
      if (!nextPage.conditionalNavigation || this.isPageAccessible(nextPage)) {
        return i;
      }
    }

    return null;
  }

  isPageAccessible(page: Page): boolean {
    if (!page.conditionalNavigation) {
      return true;
    }

    const conditions = page.conditionalNavigation.conditions;

    for (const condition of conditions) {
      const sourceQuestion = condition.sourceQuestion;
      const requiredValue = condition.requiredValue;
      const userValue = this.getFormValue(sourceQuestion);

      if (userValue !== requiredValue) {
        return false; // If any condition fails, page is not accessible
      }
    }

    return true; // All conditions are met, page is accessible
  }

  getFormValue(question: string): any {
    return this.formData ? this.formData[question] : null;
  }

  isInputVisible(input: InputConfig | ButtonInput): boolean {
    if (!input.condition) {
      return true; // Show the input if there's no condition specified
    }
    
    const condition = input.condition as ConditionalCheck;
    const sourceQuestion = condition.sourceQuestion;
    const requiredValue = condition.requiredValue;
    const userValue = this.getFormValue(sourceQuestion);

    return userValue === requiredValue;
  }
  onSubmit() {
    console.log("Form submitted!");
  }
}

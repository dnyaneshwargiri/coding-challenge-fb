import { Component, Input } from '@angular/core';
import { Page, QuestionnaireConfig } from 'src/app/models/questionnaire-config.type';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {
  @Input() questionnaireConfig: QuestionnaireConfig = { pages: [] };
  currentPageIndex: number = 0;
  formData: { [key: string]: any } = {};

  goToNextPage() {
    const currentPage = this.questionnaireConfig.pages[this.currentPageIndex];
    if (this.isPageAccessible(currentPage)) {
      this.currentPageIndex++;
    } else {
      console.log('Page not accessible based on user input.');
    }
  }
  goToPreviousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  isPageAccessible(page: Page): boolean {
    if (!page.conditionalNavigation) {
      return true;
    }

    const sourceQuestion = page.conditionalNavigation.sourceQuestion;
    const requiredValue = page.conditionalNavigation.requiredValue;
    const userValue = this.formData[sourceQuestion];

    return userValue === requiredValue;
  }


  onSubmit() {
    console.log('Form submitted!');
  }
}

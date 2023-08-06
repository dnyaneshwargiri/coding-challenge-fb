import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Question, QuestionResponseModel } from "src/app/models/question-form";
import { RecommendationService } from "src/app/services/recommendaton.service";

@Component({
  selector: "app-application-scope",
  templateUrl: "./application-scope.component.html",
  styleUrls: ["./application-scope.component.css"],
})
export class ApplicationScopeComponent {
  constructor(
    private router: Router,
    private RecommendationService: RecommendationService
  ) {}
  selectedApplicationScope = "";
  question: Question = {
    questionId: 1,
    type: "Radio",
    label: "What is the scope of application?",
    options: ["Outside", "Within"],
  };

  onOptionSelected(option: string) {
    this.selectedApplicationScope = option;
  }

  onNext() {
    const formData: QuestionResponseModel = {
      question: this.question,
      answer: this.selectedApplicationScope,
    };
    this.RecommendationService.addResponse(formData);
    this.router.navigate(["/underground"]);
  }
}

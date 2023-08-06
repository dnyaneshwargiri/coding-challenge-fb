import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Question, QuestionResponseModel } from "src/app/models/question-form";
import { QuestionnaireService } from "src/app/services/questionnaire.service";

@Component({
  selector: "app-application-scope",
  templateUrl: "./application-scope.component.html",
  styleUrls: ["./application-scope.component.css"],
})
export class ApplicationScopeComponent implements OnInit {
  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}
  selectedApplicationScope = "";
  question: Question = {
    questionId: 1,
    type: "Radio",
    label: "What is the scope of application?",
    options: ["Outside", "Within"],
  };
  ngOnInit() {}
  onOptionSelected(option: string) {
    this.selectedApplicationScope = option;
  }

  onNext() {
    const formData: QuestionResponseModel = {
      question: this.question,
      answer: this.selectedApplicationScope,
    };
    this.questionnaireService.addResponse(formData);
    this.router.navigate(["/underground"]);
  }
}

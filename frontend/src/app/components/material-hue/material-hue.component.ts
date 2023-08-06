import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Question } from "src/app/models/question-form";
import { QuestionnaireService } from "src/app/services/questionnaire.service";

@Component({
  selector: "app-material-hue",
  templateUrl: "./material-hue.component.html",
  styleUrls: ["./material-hue.component.css"],
})
export class MaterialHueComponent {
  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}
  selectedVueType = "";
  question: Question = {
    questionId: 6,
    type: "Radio",
    label: "What is the vue of material?",
    options: ["Brighter", "Darker"],
  };

  onOptionSelected(option: string) {
    this.selectedVueType = option;
  }

  onNext() {
    const formData = {
      question: this.question,
      answer: this.selectedVueType,
    };
    this.questionnaireService.addResponse(formData);
    this.router.navigate(["/recommendation"]);
  }
}

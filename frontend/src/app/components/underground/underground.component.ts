import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Question, QuestionResponseModel } from "src/app/models/question-form";
import { RecommendationService } from "src/app/services/recommendaton.service";

@Component({
  selector: "app-underground",
  templateUrl: "./underground.component.html",
  styleUrls: ["./underground.component.css"],
})
export class UndergroundComponent {
  selectedMaterialType: string = "";
  opacityKnown: boolean = false;
  question1: Question = {
    questionId: 2,
    type: "Radio",
    label: "What is the material type?",
    options: ["Wood", "Facade", "Mat", "Putz"],
  };
  question2: Question = {
    questionId: 3,
    type: "Toggle",
    label: "Do you know Opacity?",
    options: ["Yes", "No"],
  };

  constructor(
    private router: Router,
    private RecommendationService: RecommendationService
  ) {}

  onOptionSelected(option: string) {
    this.selectedMaterialType = option;
  }

  onToggleValueChange(value: boolean) {
    this.opacityKnown = value;
  }

  onNext() {
    const formData1: QuestionResponseModel = {
      question: this.question1,
      answer: this.selectedMaterialType,
    };
    this.RecommendationService.addResponse(formData1);
    const formData2: QuestionResponseModel = {
      question: this.question2,
      answer: this.opacityKnown.toString(),
    };
    this.RecommendationService.addResponse(formData2);
    this.opacityKnown
      ? this.router.navigate(["/opacity"])
      : this.router.navigate(["/materialhue"]);
  }
}

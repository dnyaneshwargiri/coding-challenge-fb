import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Question, QuestionResponseModel } from "src/app/models/question-form";
import { QuestionnaireService } from "src/app/services/questionnaire.service";

@Component({
  selector: "app-opacity",
  templateUrl: "./opacity.component.html",
  styleUrls: ["./opacity.component.css"],
})
export class OpacityComponent {
  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}
  question: Question = {
    questionId: 4,
    type: "Slider",
    label: "Opacity level",
    minValue: 80,
    maxValue: 100,
  };
  selectedOpacity: number = 0;

  onSliderValueChange(option: number) {
    this.selectedOpacity = option;
  }

  onNext() {
    const formData: QuestionResponseModel = {
      question: this.question,
      answer: this.selectedOpacity.toString(),
    };
    this.questionnaireService.addResponse(formData);
    const allResponses = this.questionnaireService.getResponses();
    const recommendedValue = "Red";
    this.questionnaireService.getRecommendation(allResponses).subscribe(
      ({ data }) => {
        const recommendedColor = data.submitFormData.recommendedColor;
        console.log("Recommended Color:", recommendedColor);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
    this.router.navigateByUrl(`/recommendation/${recommendedValue}`);
  }
}

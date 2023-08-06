import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Question, QuestionResponseModel, RecommendationOutput } from "src/app/models/question-form";
import { RecommendationService } from "src/app/services/recommendaton.service";

@Component({
  selector: "app-opacity",
  templateUrl: "./opacity.component.html",
  styleUrls: ["./opacity.component.css"],
})
export class OpacityComponent {
  constructor(
    private router: Router,
    private RecommendationService: RecommendationService
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
    this.RecommendationService.addResponse(formData);
    const allResponses = this.RecommendationService.getResponses();
    this.RecommendationService.getRecommendation(allResponses).subscribe(
      (recommendationValue : string ) => {
        const recommendedColor = recommendationValue;
        this.router.navigateByUrl(`/recommendation/${recommendedColor}`);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}

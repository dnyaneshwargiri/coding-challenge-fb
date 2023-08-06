import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  Question,
  QuestionResponseModel,
  RecommendationOutput,
} from "src/app/models/question-form";
import { RecommendationService } from "src/app/services/recommendaton.service";

@Component({
  selector: "app-material-hue",
  templateUrl: "./material-hue.component.html",
  styleUrls: ["./material-hue.component.css"],
})
export class MaterialHueComponent {
  constructor(
    private router: Router,
    private RecommendationService: RecommendationService
  ) {}
  selectedVueType = "";
  question: Question = {
    questionId: 5,
    type: "Radio",
    label: "What is the vue of material?",
    options: ["Brighter", "Darker"],
  };

  onOptionSelected(option: string) {
    this.selectedVueType = option;
  }

  onNext() {
    const formData: QuestionResponseModel = {
      question: this.question,
      answer: this.selectedVueType,
    };
    this.RecommendationService.addResponse(formData);
    const allResponses = this.RecommendationService.getResponses();
    this.RecommendationService.getRecommendation(allResponses).subscribe(
      (recommendationValue: string) => {
        const recommendedColor = recommendationValue;
        this.router.navigateByUrl(`/recommendation/${recommendedColor}`);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}

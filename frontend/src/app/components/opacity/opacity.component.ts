import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Question, QuestionResponseModel } from "src/app/models/question-form";
import { QuestionnaireService } from "src/app/services/questionnaire.service";

@Component({
  selector: "app-opacity",
  templateUrl: "./opacity.component.html",
  styleUrls: ["./opacity.component.css"],
})
export class OpacityComponent implements OnInit {
  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}
  question: Question = {
    questionId: 5,
    type: "slider",
    label: "Opacity level",
    minValue: 80,
    maxValue: 100,
  };
  selectedOpacity: number = 0;
  ngOnInit() {}

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
    console.log(allResponses);
    this.questionnaireService.getRecommendation(allResponses).subscribe(
      ({ data }) => {
        // Handle the response from the backend, e.g., display the recommended color
        const recommendedColor = data.submitFormData.recommendedColor;
        console.log("Recommended Color:", recommendedColor);
      },
      (error) => {
        // Handle errors if any
        console.error("Error:", error);
      }
    );

    this.router.navigate(["/recommendation"]);
  }
}

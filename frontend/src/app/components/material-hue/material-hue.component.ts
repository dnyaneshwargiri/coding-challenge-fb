import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Question, QuestionResponseModel } from "src/app/models/question-form";
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

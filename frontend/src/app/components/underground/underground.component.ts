import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Question, QuestionResponseModel } from "src/app/models/question-form";
import { QuestionnaireService } from "src/app/services/questionnaire.service";

@Component({
  selector: "app-underground",
  templateUrl: "./underground.component.html",
  styleUrls: ["./underground.component.css"],
})
export class UndergroundComponent implements OnInit {
  selectedMaterialType: string = "";
  opacityKnown: boolean = false;
  question1 = {
    questionId: 2,
    type: "Radio",
    label: "What is the material type?",
    options: ["Wood", "Facade", "Mat", "Putz"],
  };
  question2 = {
    questionId: 3,
    type: "toggle",
    label: "Do you know Opacity?",
  };

  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit() {}

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
    this.questionnaireService.addResponse(formData1);
    const formData2: QuestionResponseModel = {
      question: this.question2,
      answer: this.opacityKnown.toString(),
    };
    this.questionnaireService.addResponse(formData2);
    this.opacityKnown
      ? this.router.navigate(["/opacity"])
      : this.router.navigate(["/materialhue"]);
  }
}

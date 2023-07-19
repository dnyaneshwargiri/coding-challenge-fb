import { Component } from "@angular/core";
import { QuestionnaireConfig } from "./models/questionnaire-config.type";
import { QuestionnaireService } from "./services/questionnaire.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "digitizer";
  questionnaireConfig: QuestionnaireConfig = { pages: [] };
  constructor(private questionnaireService: QuestionnaireService) {
    return;
  }
  ngOnInit() {
    this.getQuestionnaireConfig();
  }
  public getQuestionnaireConfig(): void {
    this.questionnaireService.getQuestionnaireConfig().subscribe((config) => {
      this.questionnaireConfig = config;
    });
  }
}

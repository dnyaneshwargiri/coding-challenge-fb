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
  questionnaireTitle:string="Find My Color Space"
  constructor(private questionnaireService: QuestionnaireService) {
    return;
  }
  ngOnInit() {
    //this.getQuestionnaireConfigFile();
    this.getQuestionnaireConfig();
  }
  public getQuestionnaireConfigFile(): void {
    this.questionnaireService
      .getQuestionnaireConfigFile()
      .subscribe((config) => {
        this.questionnaireConfig = config;
      });
  }
  public getQuestionnaireConfig(): void {
    this.questionnaireService
      .getQuestionnaireConfig()
      .subscribe((response: any) => {
        console.log(response.data);
        //this.questionnaireConfig = response.data.questionnaires[1].pages;
      });
  }
}

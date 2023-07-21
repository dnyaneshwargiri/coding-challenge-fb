import { Component } from "@angular/core";
import { QuestionnaireConfig } from "./models/questionnaire-config.type";
import { QuestionnaireService } from "./services/questionnaire.service";
import { CommonService } from "./common/services/common.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "digitizer";
  questionnaireConfig: QuestionnaireConfig = { pages: [] };
  questionnaireTitle: string = "";
  showToaster = false;
  constructor(
    private questionnaireService: QuestionnaireService,
    private commonService: CommonService
  ) {
    return;
  }
  ngOnInit() {
    this.getQuestionnaireConfigFile(); //<-- Local file
    //this.getQuestionnaireConfigById(); //<-- From Appolo Server
    this.commonService.toasterVisibility$.subscribe((visibility) => {
      this.showToaster = visibility;
    });
  }
  public getQuestionnaireConfigFile(): void {
    this.questionnaireService
      .getQuestionnaireConfigFile()
      .subscribe((config) => {
        this.questionnaireTitle = "Find My Color Space";
        this.questionnaireConfig = config;
      });
  }
  public getQuestionnaireConfigById(): void {
    this.questionnaireService
      .getQuestionnaireConfig()
      .subscribe((response: any) => {
        this.questionnaireTitle = response.data.questionnaireById.title;
        this.questionnaireConfig = response.data.questionnaireById.pages;
      });
  }
}

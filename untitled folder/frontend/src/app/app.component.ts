import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { QuestionnaireConfig } from "./models/questionnaire-config.type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "digitizer";
  questionnaireConfig: QuestionnaireConfig = { pages: [] };
  constructor(private http: HttpClient) {
    return;
  }
  ngOnInit() {
    this.http
      .get<QuestionnaireConfig>("/assets/questionnaire-config.json")
      .subscribe((config) => {
        this.questionnaireConfig = config;
      });
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { QuestionnaireConfig } from "../models/questionnaire-config.type";

@Injectable({
  providedIn: "root",
})
export class QuestionnaireService {
  constructor(private http: HttpClient) {}

  getQuestionnaireConfig(): Observable<QuestionnaireConfig> {
    return this.http.get<QuestionnaireConfig>(
      "/assets/questionnaire-config.json"
    );
  }
}

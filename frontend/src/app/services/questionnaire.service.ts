import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { QuestionnaireConfig } from "../models/questionnaire-config.type";
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: "root",
})
export class QuestionnaireService {
  constructor(private apollo: Apollo) {}

  //this is from local file
  
  // getQuestionnaireConfig(): Observable<QuestionnaireConfig> {
  //   return this.http.get<QuestionnaireConfig>(
  //     "/assets/questionnaire-config.json"
  //   );
  // }

  
}

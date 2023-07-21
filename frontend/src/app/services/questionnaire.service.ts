import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { QuestionnaireConfig } from "../models/questionnaire-config.type";
import { Apollo } from "apollo-angular";
import {
  GET_QUESTIONNARIES,
  GET_QUESTIONNARIE_BY_ID,
} from "../graphql.operations";

@Injectable({
  providedIn: "root",
})
export class QuestionnaireService {
  constructor(private apollo: Apollo, private http: HttpClient) {}

  //From local file
  getQuestionnaireConfigFile(): Observable<QuestionnaireConfig> {
    return this.http.get<QuestionnaireConfig>(
      "/assets/questionnaire-config.json"
    );
  }
  //From Apollo Server
  getQuestionnaireConfig(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_QUESTIONNARIE_BY_ID,
    }).valueChanges;
  }
}

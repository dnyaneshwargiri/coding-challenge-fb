import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Apollo } from "apollo-angular";
import { POST_QUESTION_RESPONSES } from "../common/modules/graphql/graphql.operations";
import {
  QuestionResponseModel,
  RecommendationOutput,
  User,
} from "../models/question-form";

@Injectable({
  providedIn: "root",
})
export class RecommendationService {
  constructor(private apollo: Apollo, private http: HttpClient) {}
  private responsesSubject = new BehaviorSubject<QuestionResponseModel[]>([]);
  public responses$ = this.responsesSubject.asObservable();
  //initialize user
  loggedInUser: User = {
    userId: 1,
    userName: "Dnyaneshwar",
  };

  addResponse(response: QuestionResponseModel) {
    const currentResponses = this.responsesSubject.getValue();
    currentResponses.push(response);
    this.responsesSubject.next(currentResponses);
  }

  getResponses(): QuestionResponseModel[] {
    return this.responsesSubject.getValue();
  }

  //From Apollo Server
  getRecommendation(
    questionResponses: QuestionResponseModel[]
  ): Observable<string> {
    const userResponse = {
      userId: this.loggedInUser.userId,
      responses: questionResponses,
    };
    return this.apollo
      .mutate({
        mutation: POST_QUESTION_RESPONSES,
        variables: {
          userResponse: userResponse,
        },
      })
      .pipe(
        map((result: any) => {
          return result.data.createUserResponses as string;
        })
      );
  }
}

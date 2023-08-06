import { TestBed } from "@angular/core/testing";
import { QuestionnaireService } from "./questionnaire.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";

describe("Service: Questionnaire", () => {
  let questionnaireService: QuestionnaireService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [QuestionnaireService],
    });
    questionnaireService = TestBed.inject(QuestionnaireService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

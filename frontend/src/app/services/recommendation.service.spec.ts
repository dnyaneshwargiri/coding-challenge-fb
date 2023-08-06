import { TestBed } from "@angular/core/testing";
import { RecommendationService } from "./recommendaton.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";

describe("Service: Questionnaire", () => {
  let RecommendationService: RecommendationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [RecommendationService],
    });
    RecommendationService = TestBed.inject(RecommendationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

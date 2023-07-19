/* tslint:disable:no-unused-variable */

import { TestBed, inject } from "@angular/core/testing";
import { QuestionnaireService } from "./questionnaire.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { QuestionnaireConfig } from "../models/questionnaire-config.type";
import { HttpClientModule } from "@angular/common/http"; // Add this import

describe("Service: Questionnaire", () => {
  let questionnaireService: QuestionnaireService;
  let httpTestingController: HttpTestingController;
  const mockData: QuestionnaireConfig = {
    pages: [
      {
        pageId: 1,
        title: "Application Scope",
        inputs: [
          {
            type: "radio",
            label: "What is scope of aplication?",
            name: "scopeOfApplication",
            required: true,
            options: ["Outside", "Within"],
          },
          {
            type: "button",
            label: "Next",
            action: "next",
          },
        ],
      },
      {
        pageId: 2,
        title: "Underground",
        inputs: [
          {
            type: "checkbox",
            label: "Wood",
            name: "wood",
            condition: {
              sourceQuestion: "scopeOfApplication",
              requiredValue: "Outside",
            },
          },
          {
            type: "checkbox",
            label: "Facade",
            name: "facade",
            condition: {
              sourceQuestion: "scopeOfApplication",
              requiredValue: "Outside",
            },
          },
          {
            type: "checkbox",
            label: "Mat",
            name: "mat",
            condition: {
              sourceQuestion: "scopeOfApplication",
              requiredValue: "Within",
            },
          },
          {
            type: "checkbox",
            label: "Putz",
            name: "putz",
            condition: {
              sourceQuestion: "scopeOfApplication",
              requiredValue: "Within",
            },
          },
          {
            type: "button",
            label: "Next",
            action: "next",
          },
        ],
      },
      {
        pageId: 3,
        title: "Opacity",
        inputs: [
          {
            type: "radio",
            label: "Do you know about opacity?",
            name: "opacityKnown",
            required: true,
            options: ["Yes", "No"],
          },
          {
            type: "button",
            label: "Next",
            action: "next",
          },
        ],
      },
    ],
  };
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

  it("should return the correct questionnaire configuration", () => {
    const mockConfig: QuestionnaireConfig = mockData;

    // Set up the HTTP response
    questionnaireService.getQuestionnaireConfig().subscribe((config) => {
      expect(config).toEqual(mockConfig);
    });

    const req = httpTestingController.expectOne(
      "/assets/questionnaire-config.json"
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockConfig);
  });
});

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { QuestionnaireComponent } from "./questionnaire.component";
import { QuestionnaireService } from "../../services/questionnaire.service";
import {
  QuestionnaireConfig,
  Page,
} from "../../models/questionnaire-config.type";

describe("QuestionnaireComponent", () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let mockQuestionnaireService: Partial<QuestionnaireService>;

  const mockQuestionnaireConfig: QuestionnaireConfig = {
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

  beforeEach(waitForAsync(() => {
    mockQuestionnaireService = {
      getQuestionnaireConfig: () => of(mockQuestionnaireConfig),
    };

    TestBed.configureTestingModule({
      declarations: [QuestionnaireComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: QuestionnaireService, useValue: mockQuestionnaireService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it('should disable the "Next" button when required inputs are not filled', async () => {
    // Assuming the first page is at index 0
    component.currentPageIndex = 0;
    fixture.detectChanges();
    // Make sure that the required input element exists in the template
    await fixture.whenStable();
    const requiredInput =
      fixture.nativeElement.querySelector("input[required]");
    expect(requiredInput).toBeTruthy();
    // Simulate not filling the required input
    requiredInput.dispatchEvent(new Event("input"));
    fixture.detectChanges(); // Update the component's view
    const button = fixture.nativeElement.querySelector("button");
    expect(button.disabled).toBe(true);
  });
});

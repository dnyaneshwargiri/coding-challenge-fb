import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
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

  beforeEach(() => {
    // Create a mock service
    mockQuestionnaireService = {
      getQuestionnaireConfig: () => of(mockQuestionnaireConfig),
    };

    TestBed.configureTestingModule({
      declarations: [QuestionnaireComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: QuestionnaireService, useValue: mockQuestionnaireService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it('should disable the "Next" button when required inputs are not filled', async () => {
    component.currentPageIndex = 0;
    fixture.detectChanges();
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

  it("should navigate to the next page when required inputs are filled and the page is accessible", () => {
    component.questionnaireConfig = mockQuestionnaireConfig;
    component.currentPageIndex = 0; // Assuming the first page is at index 0
    const requiredInputName = "your-required-input-name";
    component.formData[requiredInputName] = "some value";
    // Spy on the isPageAccessible method to return true
    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.returnValue(true);
    component.goToNextPage();
    fixture.detectChanges();
    expect(component.currentPageIndex).toBe(1); // Assuming the next page is at index 1
    expect(isPageAccessibleSpy).toHaveBeenCalled();
  });

  it("should not navigate to the next page when required inputs are not filled", () => {
    component.questionnaireConfig = mockQuestionnaireConfig;
    component.currentPageIndex = 0; // Assuming the first page is at index 0
    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.returnValue(true);
    component.goToNextPage();
    fixture.detectChanges();
    expect(component.currentPageIndex).toBe(0); // Should remain on the same page
    expect(isPageAccessibleSpy).toHaveBeenCalled();
  });

  it("should not navigate to the next page when the current page is not accessible", () => {
    component.questionnaireConfig = mockQuestionnaireConfig;
    component.currentPageIndex = 0; // Assuming the first page is at index 0
    const requiredInputName = "your-required-input-name";
    component.formData[requiredInputName] = "some value";
    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.returnValue(false);
    component.goToNextPage();
    fixture.detectChanges();
    expect(component.currentPageIndex).toBe(0); // Should remain on the same page
    expect(isPageAccessibleSpy).toHaveBeenCalled();
  });

  it("should navigate to the next accessible page when required inputs are filled and the current page is not accessible", () => {
    component.questionnaireConfig = mockQuestionnaireConfig;
    component.currentPageIndex = 0; // Assuming the first page is at index 0
    const requiredInputName = "your-required-input-name";
    component.formData[requiredInputName] = "some value";
    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.callFake((page) => {
      return page === component.questionnaireConfig.pages[0] ? false : true;
    });
    const getNextAccessiblePageIndexSpy = spyOn(
      component,
      "getNextAccessiblePageIndex"
    ).and.returnValue(1);
    component.goToNextPage();
    fixture.detectChanges();
    expect(component.currentPageIndex).toBe(1);
    expect(isPageAccessibleSpy).toHaveBeenCalledTimes(2);
    expect(getNextAccessiblePageIndexSpy).toHaveBeenCalledTimes(1);
  });

  it("should log a message when no accessible page is found based on the input", () => {
    // Mock questionnaireConfig and currentPageIndex to simulate a valid scenario
    component.questionnaireConfig = mockQuestionnaireConfig;
    component.currentPageIndex = 0; // Assuming the first page is at index 0
    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.returnValue(false);
    const getNextAccessiblePageIndexSpy = spyOn(
      component,
      "getNextAccessiblePageIndex"
    ).and.returnValue(null);
    const consoleLogSpy = spyOn(console, "log");
    component.goToNextPage();
    fixture.detectChanges();
    expect(component.currentPageIndex).toBe(0);
    expect(isPageAccessibleSpy).toHaveBeenCalledTimes(1);
    expect(getNextAccessiblePageIndexSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "No accessible page found based on the input."
    );
  });

  it("should navigate to the previous page if the current page index is greater than 0", () => {
    component.questionnaireConfig = mockQuestionnaireConfig;
    component.currentPageIndex = 1; // Assuming the current page is at index 1
    component.goToPreviousPage();
    fixture.detectChanges();
    expect(component.currentPageIndex).toBe(0);
  });

  it("should not navigate to the previous page if the current page index is 0", () => {
    component.questionnaireConfig = mockQuestionnaireConfig;
    component.currentPageIndex = 0; // Assuming the current page is at index 0
    component.goToPreviousPage();
    fixture.detectChanges();
    expect(component.currentPageIndex).toBe(0);
  });
});

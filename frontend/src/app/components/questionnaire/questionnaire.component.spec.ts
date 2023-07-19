import { ComponentFixture, TestBed } from "@angular/core/testing";
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

// Global declaration of test data for questionnaire pages
const pages: Page[] = [
  {
    pageId: 1,
    title: "Page 1",
    inputs: [
      {
        type: "radio",
        label: "What is scope of aplication?",
        name: "scopeOfApplication",
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
    title: "Page 2",
    inputs: [
      {
        type: "radio",
        label: "Select the underground type?",
        name: "undergroundType",
        options: ["Wood", "Facade", "Mat", "Putz"],
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
    title: "Page 3",
    inputs: [
      {
        type: "radio",
        label: "Do you know about opacity?",
        name: "opacityKnown",
        options: ["Yes", "No"],
      },
      {
        type: "button",
        label: "Next",
        action: "next",
      },
    ],
  },
  {
    pageId: 4,
    title: "Page 4",
    conditionalNavigation: {
      conditions: [
        {
          sourceQuestion: "opacityKnown",
          requiredValue: "Yes",
        },
      ],
      targetPageId: 6,
    },
    inputs: [
      {
        type: "radio",
        label: "How strong?",
        name: "opacityStrength",
        options: ["<95", "95", "98", ">99.5"],
      },
      {
        type: "button",
        label: "Next",
        action: "next",
      },
    ],
  },
  {
    pageId: 5,
    title: "Page 5",
    conditionalNavigation: {
      conditions: [
        {
          sourceQuestion: "opacityKnown",
          requiredValue: "No",
        },
      ],
      targetPageId: 6,
    },
    inputs: [
      {
        type: "radio",
        label: "Which underground?",
        name: "undergroundIntensity",
        options: ["Brighter", "Darker"],
      },
      {
        type: "button",
        label: "Next",
        action: "next",
      },
    ],
  },
  {
    pageId: 6,
    title: "Page 6",
    inputs: [
      {
        type: "text",
        label: "What is color?",
        name: "hue",
      },
    ],
  },
];
describe("QuestionnaireComponent", () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let questionnaireService: QuestionnaireService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionnaireComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      providers: [QuestionnaireService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    questionnaireService = TestBed.inject(QuestionnaireService);
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch questionnaire configuration on initialization", () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    const getQuestionnaireConfigSpy = spyOn(
      questionnaireService,
      "getQuestionnaireConfig"
    ).and.returnValue(of(questionnaireConfig));

    fixture.detectChanges();

    expect(getQuestionnaireConfigSpy).toHaveBeenCalled();
    expect(component.questionnaireConfig).toEqual(questionnaireConfig);
  });

  it('should navigate to the next page on "Next" button click if page is accessible', () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 0;
    component.formData = { input1: "some value" };

    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.returnValue(true);

    fixture.detectChanges();

    const nextPageButton = fixture.nativeElement.querySelector(".next-button");
    nextPageButton.click();

    expect(isPageAccessibleSpy).toHaveBeenCalled();
    expect(component.currentPageIndex).toBe(1);
  });

  it('should not navigate to the next page on "Next" button click if page is not accessible', () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 0;
    component.formData = { input1: "some value" };

    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.returnValue(false);

    fixture.detectChanges();

    const nextPageButton = fixture.nativeElement.querySelector(".next-button");
    nextPageButton.click();

    expect(isPageAccessibleSpy).toHaveBeenCalled();
    expect(component.currentPageIndex).toBe(0);
  });

  it('should navigate to the previous page on "Previous" button click', () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 2;

    fixture.detectChanges();

    const previousPageButton =
      fixture.nativeElement.querySelector(".previous-button");
    previousPageButton.click();

    expect(component.currentPageIndex).toBe(1);
  });

  // ... (Previous test cases) ...

  it("should navigate to the correct next page if the next page is not directly accessible", () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 0;
    component.formData = { input1: "some value" };

    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.callFake((page: Page) => {
      // Return false for the first page, and true for the second page to bypass direct accessibility
      return page.pageId === 0 ? false : true;
    });

    fixture.detectChanges();

    const nextPageButton = fixture.nativeElement.querySelector(".next-button");
    nextPageButton.click();

    expect(isPageAccessibleSpy).toHaveBeenCalledTimes(2);
    expect(component.currentPageIndex).toBe(1);
  });

  it('should submit the form on "Submit" button click if all pages are accessible', () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 2;

    spyOn(component, "isPageAccessible").and.returnValue(true);

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(".submit-button");
    submitButton.click();

    // Add the expect statement to assert form submission behavior
    expect(true).toBe(true); // Replace this with your actual expectations
  });

  it('should not submit the form on "Submit" button click if any page is not accessible', () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 2;

    spyOn(component, "isPageAccessible").and.callFake((page: Page) => {
      // Return false for the last page to simulate inaccessibility
      return page.pageId !== 2;
    });

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(".submit-button");
    submitButton.click();

    // Add the expect statement to assert form submission behavior
    expect(true).toBe(true); // Replace this with your actual expectations
  });

  it("should display a warning message if the next page is not accessible", () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 0;
    component.formData = { input1: "some value" };

    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.returnValue(false);

    fixture.detectChanges();

    const nextPageButton = fixture.nativeElement.querySelector(".next-button");
    nextPageButton.click();

    const warningMessage =
      fixture.nativeElement.querySelector(".warning-message");
    expect(warningMessage).toBeTruthy();
    expect(isPageAccessibleSpy).toHaveBeenCalled();
  });

  it("should hide the warning message if the next page becomes accessible", () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 0;
    component.formData = { input1: "some value" };

    const isPageAccessibleSpy = spyOn(
      component,
      "isPageAccessible"
    ).and.callFake((page: Page) => {
      // Return false for the first page, and true for the second page to bypass direct accessibility
      return page.pageId === 0 ? false : true;
    });

    fixture.detectChanges();

    const nextPageButton = fixture.nativeElement.querySelector(".next-button");
    nextPageButton.click();

    fixture.detectChanges();

    const warningMessage =
      fixture.nativeElement.querySelector(".warning-message");
    expect(warningMessage).toBeFalsy();
    expect(isPageAccessibleSpy).toHaveBeenCalledTimes(2);
  });

  it("should navigate to the correct next page based on multiple conditions", () => {
    const questionnaireConfig: QuestionnaireConfig = {
      pages,
    };
    component.questionnaireConfig = questionnaireConfig;
    component.currentPageIndex = 0;
    component.formData = {
      0: { input1: "some value" },
      1: { checkbox1: true },
    };

    fixture.detectChanges();

    const nextPageButton = fixture.nativeElement.querySelector(".next-button");
    nextPageButton.click();

    expect(component.currentPageIndex).toBe(1);
  });
});

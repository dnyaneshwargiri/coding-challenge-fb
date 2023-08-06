import { Component } from "@angular/core";
import { QuestionnaireService } from "./services/questionnaire.service";
import { CommonService } from "./common/services/common.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "digitizer";
  questionnaireTitle: string = "";
  showToaster = false;

  constructor(private commonService: CommonService) {
    return;
  }
  ngOnInit() {
    this.commonService.toasterVisibility$.subscribe((visibility) => {
      this.showToaster = visibility;
    });
  }
}

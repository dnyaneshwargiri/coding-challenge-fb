import { Component } from "@angular/core";
import { CommonService } from "./common/services/common.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
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

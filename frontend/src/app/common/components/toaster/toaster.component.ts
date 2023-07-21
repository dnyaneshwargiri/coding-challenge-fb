import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-toaster",
  templateUrl: "./toaster.component.html",
  styleUrls: ["./toaster.component.css"],
})
export class ToasterComponent implements OnInit {
  constructor(private commonService: CommonService) {}
  message: string = "";
  ngOnInit() {
    this.commonService.toasterMessage$.subscribe((toasterMessage) => {
      this.message = toasterMessage;
    });
  }
}

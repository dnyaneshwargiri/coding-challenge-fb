import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-opacity",
  templateUrl: "./opacity.component.html",
  styleUrls: ["./opacity.component.css"],
})
export class OpacityComponent implements OnInit {
  constructor(private router: Router) {}
  selectedOpacity: number = 0;
  ngOnInit() {}

  onSliderValueChange(option: number) {
    this.selectedOpacity = option;
  }
  
  onNext() {
    const formData = {
      selectedOpacity: this.selectedOpacity,
    };
    this.router.navigate(["/recommendation"], { state: { formData } });
  }
}

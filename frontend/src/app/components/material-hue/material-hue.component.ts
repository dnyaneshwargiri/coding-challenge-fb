import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-material-hue",
  templateUrl: "./material-hue.component.html",
  styleUrls: ["./material-hue.component.css"],
})
export class MaterialHueComponent implements OnInit {
  constructor(private router: Router) {}
  selectedVueType = "";

  ngOnInit() {}
  onOptionSelected(option: string) {
    this.selectedVueType = option;
  }

  onNext() {
    const formData = {
      selectedApplicationScope: this.selectedVueType,
    };
    this.router.navigate(["/underground"], { state: { formData } });
  }
}

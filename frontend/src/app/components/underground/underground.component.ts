import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-underground",
  templateUrl: "./underground.component.html",
  styleUrls: ["./underground.component.css"],
})
export class UndergroundComponent implements OnInit {
  selectedMaterialType: string = "";
  opacityKnown: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onOptionSelected(option: string) {
    this.selectedMaterialType = option;
  }

  onToggleValueChange(value: boolean) {
    this.opacityKnown = value;
  }

  onNext() {
    const formData = {
      selectedMaterialType: this.selectedMaterialType,
      opacityKnown: this.opacityKnown,
    };
    this.router.navigate(["/opacity"], { state: { formData } });
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-application-scope",
  templateUrl: "./application-scope.component.html",
  styleUrls: ["./application-scope.component.css"],
})
export class ApplicationScopeComponent implements OnInit {
  constructor(private router: Router) {}
  selectedApplicationScope = "";

  ngOnInit() {}
  onOptionSelected(option: string) {
    this.selectedApplicationScope = option;
  }

  onNext() {
    const formData = {
      selectedApplicationScope: this.selectedApplicationScope,
    };
    this.router.navigate(["/underground"], { state: { formData } });
  }
}

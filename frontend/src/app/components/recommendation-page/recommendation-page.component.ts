import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recommendation-page",
  templateUrl: "./recommendation-page.component.html",
  styleUrls: ["./recommendation-page.component.css"],
})
export class RecommendationPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  recommendationValue = "";

  ngOnInit() {
    this.recommendationValue = this.route.snapshot.params['recommendedValue'];
  }
}

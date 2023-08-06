import { Routes, RouterModule } from "@angular/router";
import { ApplicationScopeComponent } from "../components/application-scope/application-scope.component";
import { UndergroundComponent } from "../components/underground/underground.component";
import { OpacityComponent } from "../components/opacity/opacity.component";
import { RecommendationPageComponent } from "../components/recommendation-page/recommendation-page.component";
import { NgModule } from "@angular/core";
import { MaterialHueComponent } from "../components/material-hue/material-hue.component";

const routes: Routes = [
  { path: "underground", component: UndergroundComponent },
  { path: "opacity", component: OpacityComponent },
  { path: "materialhue", component: MaterialHueComponent },
  { path: "recommendation/:recommendedValue", component: RecommendationPageComponent },
  { path: "**", component: ApplicationScopeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
import { Routes, RouterModule } from "@angular/router";
import { ApplicationScopeComponent } from "../components/application-scope/application-scope.component";
import { UndergroundComponent } from "../components/underground/underground.component";
import { OpacityComponent } from "../components/opacity/opacity.component";
import { RecommendationPageComponent } from "../components/recommendation-page/recommendation-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "", component: ApplicationScopeComponent },
  { path: "underground", component: UndergroundComponent },
  { path: "opacity", component: OpacityComponent },
  { path: "recommendation", component: RecommendationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
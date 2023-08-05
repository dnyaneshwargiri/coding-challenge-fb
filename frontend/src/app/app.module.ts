import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { GraphQLModule } from "../app/common/modules/graphql/graphql.module";
import { CommonsModule } from "./common/commons.module";
import { ApplicationScopeComponent } from "./components/application-scope/application-scope.component";
import { OpacityComponent } from "./components/opacity/opacity.component";
import { UndergroundComponent } from "./components/underground/underground.component";
import { RecommendationPageComponent } from "./components/recommendation-page/recommendation-page.component";
import { AppRoutingModule } from "./routes/app.routing";

@NgModule({
  declarations: [
    AppComponent,
    ApplicationScopeComponent,
    OpacityComponent,
    UndergroundComponent,
    RecommendationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    CommonsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

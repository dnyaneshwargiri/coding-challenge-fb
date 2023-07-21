import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { QuestionnaireComponent } from "./components/questionnaire/questionnaire.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { GraphQLModule } from "./graphql.module";
import { CommonsModule } from "./common/commons.module";

@NgModule({
  declarations: [AppComponent, QuestionnaireComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
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

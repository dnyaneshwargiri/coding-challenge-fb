import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToasterComponent } from "./components/toaster/toaster.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RadioInputComponent } from "./components/inputs/radioInput/radioInput.component";
import { SliderInputComponent } from "./components/inputs/sliderInput/sliderInput.component";
import { ToggleInputComponent } from "./components/inputs/toggleInput/toggleInput.component";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule],
  declarations: [
    ToasterComponent,
    RadioInputComponent,
    SliderInputComponent,
    ToggleInputComponent,
    HeaderComponent
  ],
  exports: [
    ToasterComponent,
    RadioInputComponent,
    SliderInputComponent,
    ToggleInputComponent,
    HeaderComponent
  ],
})
export class CommonsModule {}

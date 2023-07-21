import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToasterComponent } from "./components/toaster/toaster.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ToasterComponent],
  exports: [ToasterComponent],
})
export class CommonsModule {}

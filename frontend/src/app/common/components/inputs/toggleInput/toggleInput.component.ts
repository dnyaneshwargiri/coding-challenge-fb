import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "input-toggle",
  templateUrl: "./toggleInput.component.html",
  styleUrls: ["./toggleInput.component.css"],
})
export class ToggleInputComponent {
  @Input() question: string = "";
  @Output() valueChange = new EventEmitter<boolean>();
  toggleValue = false;

  onToggle() {
    this.toggleValue = !this.toggleValue;
    this.valueChange.emit(this.toggleValue);
  }
}

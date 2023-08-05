import { Component, EventEmitter, Input, Output } from "@angular/core";
@Component({
  selector: "input-radio",
  templateUrl: "./radioInput.component.html",
  styleUrls: ["./radioInput.component.css"],
})
export class RadioInputComponent  {
  constructor() {}

  @Input() question: string = "";
  @Input() options: string[] = [];
  selectedOption = "";
  @Output() optionSelected = new EventEmitter<string>();

  ngOnInit() {}
  onOptionSelected() {
    this.optionSelected.emit(this.selectedOption);
  }
}

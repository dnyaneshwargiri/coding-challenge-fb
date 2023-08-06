import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "slider-input",
  templateUrl: "./sliderInput.component.html",
  styleUrls: ["./sliderInput.component.css"],
})
export class SliderInputComponent {
  constructor() {}
  @Input() question: string = "";
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Output() valueChange = new EventEmitter<number>();
  opacityValue = 100;

  onSliderChange(event: any) {
    this.opacityValue = parseInt(event.target?.value, 10);
    this.valueChange.emit(this.opacityValue);
  }
}

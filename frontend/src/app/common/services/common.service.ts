import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private toasterVisibilitySubject = new BehaviorSubject<boolean>(false);
  public toasterVisibility$ = this.toasterVisibilitySubject.asObservable();

  private toasterMessageSubject = new BehaviorSubject<string>("");
  public toasterMessage$ = this.toasterMessageSubject.asObservable();

  constructor() {}

  showToaster(message: string) {
    this.toasterVisibilitySubject.next(true);
    this.toasterMessageSubject.next(message);
    // Hide the toaster after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      this.hideToaster();
    }, 3000);
  }

  hideToaster() {
    this.toasterVisibilitySubject.next(false);
    this.toasterMessageSubject.next("");
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-messages',
  template: `<small *ngIf="_errorMessage" class="form-text text-danger error-message">{{ _errorMessage }}</small>`,
  styleUrls: [],
})
export class ErrorMessagesComponent {
  public _errorMessage!: string | null;
  @Input() control!: any;
  @Input() message: any;

  constructor() {
    this.message = null;
  }
  ngDoCheck() {
    this.errorMessage();
  }
  errorMessage() {
    if (this.control.errors != null) {
      for (const propertyName in this.control.errors) {
        if ((this.control.errors.hasOwnProperty(propertyName) && this.control.touched === true && this.control.invalid === true) || this.control.disabled === true) {
          this._errorMessage = this.getmessage(propertyName);
          break;
        }
      }
    } else {
      this._errorMessage = null;
    }
    return null;
  }

  getmessage(param: any) {
    if (this.message != null && this.message.hasOwnProperty(param)) {
      return this.message[param];
    } else {
      return null;
    }
  }
}

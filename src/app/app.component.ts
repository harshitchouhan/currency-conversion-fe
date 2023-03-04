import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'currency-conversion-fe';

  form = new FormGroup({
    amount: new FormControl(1, [Validators.required, Validators.max(999999999)]),
    from: new FormControl('USD', [Validators.required, Validators.maxLength(3)]),
    to: new FormControl('INR', [Validators.required, Validators.maxLength(3)]),
    convertedValue: new FormControl(81),
  });
}

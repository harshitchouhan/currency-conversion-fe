import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'currency-conversion-fe';

  rates: any[] = [];

  form!: FormGroup;
  timestamp = moment(new Date()).format('YYYY-MM-DD');

  constructor(private http: HttpService) {
    this.form = new FormGroup({
      amount: new FormControl(1, [Validators.required, Validators.max(9999999999999999999999999)]),
      from: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      to: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      convertedValue: new FormControl(81),
    });

    this._fetchCurrencyRates();
  }

  private _fetchCurrencyRates() {
    this.http.postUrl = 'currency/rates';
    // this.http.postUrl = environment.fetchCurrencyRatesURL;
    this.http.getData().subscribe({
      next: (data) => {
        const encData = data.data;
        const bytes = CryptoJS.AES.decrypt(encData, environment.encKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        Object.keys(decryptedData.rates).forEach((key) => {
          let value = { label: key, value: decryptedData.rates[key] };
          this.rates.push(value);
          if (key === 'USD') this.form.get('from')?.setValue(value);
          if (key === 'INR') {
            this.form.get('to')?.setValue(value);
            this.form.get('convertedValue')?.setValue(value.value);
          }
        });
      },
      error: (e) => {
        console.log(e);
        alert('Something went wrong. Please try again after sometime');
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let from = this.form.get('from')?.value;
      let to = this.form.get('to')?.value;
      let amount = this.form.get('amount')?.value;
      let toValue = to['value'];

      if (from['label'] === 'USD' && to['label'] === 'INR') {
        this.form.get('convertedValue')?.setValue(toValue * amount);
      } else {
        console.log(from);
        let fromValue = (1 / from.value) * toValue;
        this.form.get('convertedValue')?.setValue(fromValue * amount);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}

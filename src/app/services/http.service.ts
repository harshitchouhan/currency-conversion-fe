import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public host: string = '/curreny-conversion/api/v1/';
  public postUrl: string = 'api/';

  constructor(private http: HttpClient) {}

  getData(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers),
    };

    return this.http.get<any[]>(environment.fetchCurrencyRatesURL + this.postUrl, httpOptions);
  }
}

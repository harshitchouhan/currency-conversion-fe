import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ErrorMessagesModule } from './shared/error-messages/error-messages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, NgbModule, HttpClientModule, NgSelectModule, ErrorMessagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

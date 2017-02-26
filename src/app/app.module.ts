import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MediInputComponent } from './medi-input/medi-input.component';
import { MultiselectComponent } from './multiselect/multiselect.component';

@NgModule({
  declarations: [
    AppComponent,
    MediInputComponent,
    MultiselectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

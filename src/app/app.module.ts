import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbRadioModule,
  NbSelectModule,
  NbStepperModule,
  NbCheckboxModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { AppRoutingModule } from "./app-routing.module";
import { DonationFormComponent } from "./donation-form/donation-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomAmountComponent } from './custom-amount/custom-amount.component';

@NgModule({
  declarations: [AppComponent, DonationFormComponent, CustomAmountComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "corporate" }),
    NbCardModule,
    NbLayoutModule,
    NbRadioModule,
    NbEvaIconsModule,
    NbCheckboxModule,
    NbStepperModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

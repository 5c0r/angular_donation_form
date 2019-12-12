import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";

// TODO: Translation variables ?
enum DonatorTypes {
  Individual = "individual",
  Company = "company"
}

enum DonationTypes {
  OneTime = "onetime",
  Recurring = "recurring"
}

@Component({
  selector: "app-donation-form",
  templateUrl: "./donation-form.component.html",
  styleUrls: ["./donation-form.component.scss"]
})
export class DonationFormComponent implements OnInit {
  // TODO: translation?
  @Input() readonly lang = "en";

  @Input() oneTimeDestinations: any[] = [];
  @Input() subscriptionDestinations: any[] = [];

  @Input() predefinedAmount: number[] = [];
  @Input() predefinedAmountBusiness: number[] = [];

  readonly zeroStep: FormGroup;
  readonly donatorTypes = DonatorTypes;

  readonly firstStep: FormGroup;
  readonly donationTypes = DonationTypes;

  readonly firstStepCompany: FormGroup;
  readonly companyDonationTypes = DonationTypes;

  readonly secondStep: FormGroup;
  readonly secondStepCompany: FormGroup;

  readonly oneTimeDestination: any[] = ["Test", "Testtt"];
  readonly subscriptionDestination: any[] = ["Test2", "Testtt2"];

  constructor(readonly fb: FormBuilder) {
    this.zeroStep = fb.group({
      donatorType: fb.control(this.donatorTypes.Individual, Validators.required)
    });

    this.zeroStep.valueChanges.subscribe(ev => this.onZeroStepValueChanges(ev));

    this.firstStep = fb.group({
      donationType: fb.control({}, Validators.required),
      donationDestination: fb.control({}, Validators.required),
      donationAmount: fb.control(0, Validators.required)
    });

    // this.firstStep.disable();
    this.firstStep
      .get("donationType")
      .valueChanges.subscribe(ev => this.onDonationTypeChange(this.firstStep));

    this.firstStepCompany = fb.group({
      donationType: fb.control({}, Validators.required),
      donationDestination: fb.control({}, Validators.required),
      donationAmount: fb.control(0, Validators.required)
    });

    this.firstStepCompany.disable();
    this.firstStepCompany
      .get("donationType")
      .valueChanges.subscribe(ev =>
        this.onDonationTypeChange(this.firstStepCompany)
      );

    // TODO: Phone number validator
    this.secondStep = fb.group({
      firstName: fb.control("", Validators.required),
      lastName: fb.control("", Validators.required),
      phone: fb.control("", Validators.required),
      email: fb.control("", Validators.required),
      country: fb.control("Finland", Validators.required),
      emailMe: fb.control(true, Validators.required),
      smsMe: fb.control(false, Validators.required)
    });

    this.secondStepCompany = fb.group({
      name: fb.control({}, Validators.required),
      businessid: fb.control({}, Validators.required)
    });

    this.secondStepCompany.disable();
  }

  onZeroStepValueChanges(formValue: any): void {
    console.log("onZeroStep value", formValue, this);

    console.log("onZeroStep submit", formValue);

    // TODO: Reset forms and show which one is relevant
    switch (formValue.donatorType) {
      case DonatorTypes.Company: {
        this.firstStep.disable();
        this.firstStepCompany.enable();
        break;
      }
      case DonatorTypes.Individual: {
        this.firstStep.enable();
        this.firstStepCompany.disable();
        break;
      }
    }

    this.firstStep.reset();
    this.firstStepCompany.reset();
  }

  onZeroStepSubmit($ev: NgForm): void {
    console.log("Do nothing yet");
  }

  onPredefinedAmountChange(predefineValue: number): void {
    console.log("onPredefinedAmount", predefineValue);

    const amountControl = this.firstStep.get("donationAmount");
    if (predefineValue !== null) {
      amountControl.disable();
      amountControl.setValue(predefineValue);
    } else {
      amountControl.setValue(0);
      amountControl.enable();
    }
  }

  onPredefinedAmountCompanyChange(predefineValue: number): void {
    const amountControl = this.firstStepCompany.get("donationAmount");
    if (predefineValue !== null) {
      amountControl.disable();
      amountControl.setValue(predefineValue);
    } else {
      amountControl.setValue(0);
      amountControl.enable();
    }
  }

  onDonationTypeChange(form: FormGroup) {
    console.log("onDonationTypeChange", form);
  }

  onFirstStepSubmit($ev: any): void {
    console.log("onFirstStep submit", $ev);
    console.log("onFirstStep value", $ev.form.value);
  }
  onFirstStepCompanySubmit($ev: any): void {
    console.log("onFirstStepCompany submit", $ev);
  }

  onSecondStepSubmit(secondForm: FormGroup) {
    console.log("secondstep submit", secondForm);
  }

  ngOnInit() {}
}

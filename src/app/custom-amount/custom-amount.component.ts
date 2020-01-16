import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-amount',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomAmountComponent),
      multi: true
    }
  ],
  templateUrl: './custom-amount.component.html',
  styleUrls: ['./custom-amount.component.scss']
})
export class CustomAmountComponent implements OnInit, ControlValueAccessor {

  @Input() readonly predefinedAmounts: number[] = [3,4,5,6];
  @Input() readonly initialAmount: number = 0;
  @Input() readonly otherAmount: boolean = true;

  predefinedAmountCtrl: FormControl = new FormControl(0);
  customAmountCtrl: FormControl = new FormControl(0);

  // TODO: Min, max

  propagateChange = (_: any) => {};

  private realAmount: number = 0;

  public get RealAmount() {
    return this.realAmount;
  }

  public set RealAmount(amount: number){
    this.realAmount = amount;
    this.propagateChange(this.realAmount);
  }

  constructor() { }

  ngOnInit() {
    this.customAmountCtrl.valueChanges.subscribe( val => this.onCustomAmountChanged(val));
    this.predefinedAmountCtrl.valueChanges.subscribe( val => this.onPredefinedAmountChanged(val));
  }

  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log("Form control touched");
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log("Form control disabled")
  }

  onPredefinedAmountChanged(val: number): void {
    console.log("on predefined amount changed", val);
    let newValue = val;

    if(val == 0) {
      this.customAmountCtrl.reset(0);
      newValue = this.customAmountCtrl.value;
    }

    this.RealAmount = newValue;
    console.log('RealAmount', this.RealAmount);

  }

  onCustomAmountChanged( val: number): void {
    console.log("onCustome amount changed", val);

    this.RealAmount = val;
    console.log('RealAmount', this.RealAmount);

  }

  ngOnDestroy() {
    // Maybe we don't need to destroy
  }
}

import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Directive({
  selector: '[validateRange][ngModel],[validateRange][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => RangeValidator), multi: true }
  ]
})
export class RangeValidator implements Validator {
  @Input()
  get from() {
    return this._from;
  }
  set from(value: number) {
    this._from = value;
    if (this._onChange){ 
      this._onChange();
    }
  }
 
  @Input()
  get to() {
    return this._to;
  }
  set to(value: number) {
    this._to = value;
    if (this._onChange) {
      this._onChange();
    }
  }

  validate(c: FormControl): { [key: string]: boolean; } {

    let from: number = this.from;
    let to: number = this.to;
    let value: number = parseInt(c.value);

    let tooSmall = false;
    let tooBig = false;
    console.log(from, to);

    if (from && value && (value < from)) {
      tooSmall = true;
    }
    if (to && value && (value > to)) {
      tooBig = true;
    }

    if (tooBig || tooSmall) {
      return { "tooSmall": tooSmall, "tooBig": tooBig };
    }
  }
  
  private _from: number;

  private _to: number;

  private _onChange: () => void;

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
}
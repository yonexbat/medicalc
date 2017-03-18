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
  

  @Input('from') public from: number;
  @Input('to') public to: number;

  validate(c: FormControl) : Boolean {
    let from = this.from;
    let to = this.to;
    debugger;
    return true;
  }
}
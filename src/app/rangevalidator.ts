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

  validate(c: FormControl) : { [key:string]:boolean; } {

    let from = this.from;
    let to = this.to;
    let value = c.value;

    let tooSmall = false;
    let tooBig = false; 

    if(from && (value < from))
    {
        tooSmall = true;
    }
    if(to && (value > to))
    {
      tooBig = true;
    }

    
    return {"tooSmall" : tooSmall, "tooBig" : tooBig};
  }
}
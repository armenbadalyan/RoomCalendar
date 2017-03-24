import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';
import { validateEmail } from './';

@Directive({
  selector: '[email][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }
  ]
})
export class EmailValidator implements Validator {
  
  validate(c: AbstractControl) {
    return validateEmail(c);
  }
  
}
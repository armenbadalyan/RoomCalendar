import { AbstractControl, ValidatorFn } from '@angular/forms';


interface ValidationError {
    [key: string]: { 
      'valid': boolean 
    }
}

export const validateEmail: ValidatorFn = (control: AbstractControl): ValidationError => {
      let isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

      if(isValid) {
          return null;
      } else {
          return {
              email: {
                  valid: false
              }
          };
    }
}
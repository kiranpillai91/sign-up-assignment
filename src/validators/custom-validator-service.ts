import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RESTRICTED_EMAIL_DOMAIN } from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  passwordPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  passwordContains(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const passwordControl = formGroup.get('password')?.value.toLowerCase();
      if (!passwordControl) {
        return null;
      }
      const firstNameControl = formGroup.get('firstName')?.value.toLowerCase();
      const lastNameControl = formGroup.get('lastName')?.value.toLowerCase();
      if (firstNameControl && passwordControl.indexOf(firstNameControl) !== -1) {
        return { passwordContains: true };
      } else if (lastNameControl && passwordControl.indexOf(lastNameControl) !== -1) {
        return { passwordContains: true };
      }
      return null;
    };
  }

  emailDomainValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      for (let domainIndex = 0; domainIndex < RESTRICTED_EMAIL_DOMAIN.length; domainIndex++) {
        const currentEmailDomain = RESTRICTED_EMAIL_DOMAIN[domainIndex].toLowerCase();
        const regex = new RegExp(`^[a-z0-9._%+-]+@${currentEmailDomain}`);
        if (regex.test(control.value.toLowerCase())) {
          return { invalidEmailDomain: true };
        }
      }
      return null;
    };
  }

}

/**
 * Utility validators for forms
 */

import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static emailDomain(domain: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const email = control.value as string;
      return email.endsWith(`@${domain}`)
        ? null
        : { emailDomain: { domain } };
    };
  }

  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const password = control.value as string;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const isStrong =
        hasUpperCase &&
        hasLowerCase &&
        hasDigit &&
        hasSpecialChar &&
        password.length >= 8;

      return isStrong ? null : { passwordStrength: true };
    };
  }

  static match(fieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const field = control.get(fieldName);
      const value = control.value;

      if (!field || !value) {
        return null;
      }

      return field.value === value[Object.keys(value)[0]]
        ? null
        : { match: true };
    };
  }
}

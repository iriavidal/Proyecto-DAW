import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password_usuario')?.value;
  const password2 = control.get('password2')?.value;

  return password === password2 ? null : { PasswordNoMatch: true };
};

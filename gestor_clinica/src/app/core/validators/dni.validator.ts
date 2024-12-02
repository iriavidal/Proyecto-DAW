import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dniValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (!value) return null;

    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (!dniRegex.test(value)) {
      return { invalidDni: 'El formato del DNI es inválido' };
    }

    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const numeros = parseInt(value.slice(0, -1), 10);
    const letra = value.slice(-1).toUpperCase();

    if (letras[numeros % 23] !== letra) {
      return { invalidDni: 'La letra del DNI no corresponde' };
    }

    return null;
  };
}

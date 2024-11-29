import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  loginForm: FormGroup = new FormGroup({});
  loginError: string = '';
  loading = false;
  hide = signal(true);

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group(
      {
        email_usuario: ['', [Validators.required, Validators.email]],
        password_usuario: ['', [Validators.required]],
        password2: ['', [Validators.required]],
      },
      { validators: [confirmPasswordValidator] }
    );
  }

  get email_usuario() {
    return this.loginForm.get('email_usuario');
  }

  get password_usuario() {
    return this.loginForm.get('password_usuario');
  }

  get password2() {
    return this.loginForm.get('password2');
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;

      const userData = {
        email_usuario: this.email_usuario?.value,
        password_usuario: this.password_usuario?.value,
      };

      console.log(userData);

      this.authService.register(userData).subscribe({
        next: (data) => {
          console.log('Registro exitoso:', data);
          this._router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          this.loginError = err.message;
        },
        complete: () => (this.loading = false),
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}

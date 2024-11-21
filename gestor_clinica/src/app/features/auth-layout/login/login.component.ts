import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  loginError: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    /* private authService: AuthService, */
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  showAlert() {
    window.alert('Pendiente de implementación');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const user = {
        username: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      console.log(user);
    } else {
      console.log('Formulario inválido');
    }
  }
}

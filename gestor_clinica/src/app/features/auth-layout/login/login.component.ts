import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

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
    private authService: AuthService,
    private _router: Router,
    private tokenService: TokenService,
    private observer: BreakpointObserver
  ) {
    this.loginForm = this.fb.group({
      email_usuario: ['', [Validators.required, Validators.email]],
      password_usuario: ['', [Validators.required]],
    });
  }

  get email_usuario() {
    return this.loginForm.get('email_usuario');
  }

  get password_usuario() {
    return this.loginForm.get('password_usuario');
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
      this.loginError = ''; // Limpia cualquier error previo

      const credentials = {
        email_usuario: this.email_usuario?.value,
        password_usuario: this.password_usuario?.value,
      };

      this.authService.login(credentials).subscribe(
        (response: any) => {
          this.loading = false;
          if (response.status === 200) {
            const token = response.results[0].token_usuario;

            this.tokenService.storeToken(token);

            this.observer
              .observe(['(max-width: 767px)'])
              .subscribe((screenSize) => {
                if (screenSize.matches) {
                  //console.log('Móvil');
                  this._router.navigate(['/menu']);
                } else {
                  //console.log('Ordenador');
                  this._router.navigate(['/menu/mascota']);
                }
              });
          }
        },
        (error) => {
          this.loading = false;
          this.loginError = error.message || 'Ha ocurrido un error inesperado.';
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { TokenService } from 'src/app/core/services/token.service';

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
    private observer: BreakpointObserver,
    private usuariosService: UsuariosService
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

            const id = this.tokenService.getUserIdFromToken();
            //console.log(id);

            if (id) {
              this.usuariosService.getUsuario(id).subscribe({
                next: (data) => {
                  //console.log(data.results[0].id_rol);
                  if (data.results[0].id_rol === 1) {
                    /* Usuario cliente */
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
                  } else if (data.results[0].id_rol === 2) {
                    /* Usuario veterinario */
                    //console.log('Veterinario con id: ', id);
                    this._router.navigate(['/veterinario']);
                  }
                },
                error: (err) => console.error(err),
              });
            }
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

import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password.validator';
import { dniValidator } from 'src/app/core/validators/dni.validator';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  loginForm: FormGroup = new FormGroup({});
  datosForm: FormGroup = new FormGroup({});
  loginError: string = '';
  loading = false;
  hide = signal(true);
  orientation: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private authService: AuthService,
    private observer: BreakpointObserver
  ) {
    this.datosForm = this.fb.group({
      nombre_usuario: ['', [Validators.required]],
      apellidos_usuario: ['', [Validators.required]],
      dni_usuario: ['', [Validators.required, dniValidator()]],
      telefono_usuario: ['', [Validators.required]],
    });

    this.loginForm = this.fb.group(
      {
        email_usuario: ['', [Validators.required, Validators.email]],
        password_usuario: ['', [Validators.required]],
        password2: ['', [Validators.required]],
      },
      { validators: [confirmPasswordValidator] }
    );

    this.observer.observe(['(max-width: 767px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        //console.log('Móvil');
        this.orientation = true;
      } else {
        //console.log('Ordenador');
        this.orientation = false;
      }
    });
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

  get nombre_usuario() {
    return this.datosForm.get('nombre_usuario');
  }

  get apellidos_usuario() {
    return this.datosForm.get('apellidos_usuario');
  }

  get dni_usuario() {
    return this.datosForm.get('dni_usuario');
  }

  get telefono_usuario() {
    return this.datosForm.get('telefono_usuario');
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;

      const userData = {
        nombre_usuario: this.nombre_usuario?.value,
        apellidos_usuario: this.apellidos_usuario?.value,
        email_usuario: this.email_usuario?.value,
        password_usuario: this.password_usuario?.value,
        dni_usuario: this.dni_usuario?.value,
        telefono_usuario: this.telefono_usuario?.value,
        id_rol: 1,
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

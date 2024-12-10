import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-datos-user',
  templateUrl: './datos-user.component.html',
  styleUrl: './datos-user.component.scss',
})
export class DatosUserComponent {
  datosUser: FormGroup = new FormGroup({});
  idUser: number = 0;
  usuarios: any[] = [];

  data: {
    nombre_usuario: string;
    apellidos_usuario: string;
    dni_usuario: string;
    telefono_usuario: string;
    email_usuario: string;
  } = {
    nombre_usuario: '',
    apellidos_usuario: '',
    dni_usuario: '',
    telefono_usuario: '',
    email_usuario: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsuariosService
  ) {
    this.datosUser = this.fb.group({
      nombre_usuario: [''],
      apellidos_usuario: [''],
      dni_usuario: [''],
      telefono_usuario: ['', Validators.required],
      email_usuario: ['', [Validators.required, Validators.email]],
    });

    this.route.params.subscribe((params) => {
      if (params['id_usuario']) {
        this.idUser = +params['id_usuario'];
        this.cargarDatos();
      }
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.results;
        this.usuarios = this.usuarios.filter(
          (usuario) => usuario.id_usuario !== this.idUser
        );
        console.log(this.usuarios);
      },
      error: (err) => console.error(err),
    });
  }

  cargarDatos() {
    this.userService.getUsuario(this.idUser).subscribe({
      next: (data) => {
        this.data = data.results[0];

        this.datosUser.patchValue({ nombre_usuario: this.data.nombre_usuario });
        this.datosUser.patchValue({
          apellidos_usuario: this.data.apellidos_usuario,
        });
        this.datosUser.patchValue({
          dni_usuario: this.data.dni_usuario,
        });
        this.datosUser.patchValue({
          telefono_usuario: this.data.telefono_usuario,
        });
        this.datosUser.patchValue({
          email_usuario: this.data.email_usuario,
        });
      },
      error: (err) => {
        console.error('Error al cargar el usuario:', err);
      },
    });
  }

  recogerDatos(event: string, input: string) {
    if (this.idUser !== null) {
      if (input == 'telefono') {
        this.data.telefono_usuario = event;
      }

      if (input == 'email') {
        if (this.usuarios.some((usuario) => usuario.email_usuario === event)) {
          this.datosUser
            .get('email_usuario')
            ?.setErrors({ emailInvalido: true });
        } else {
          this.data.email_usuario = event;
        }
      }
    }
  }

  onSubmit() {
    if (this.datosUser.valid) {
      this.userService
        .updateUsuario(this.idUser, sessionStorage['authToken'], this.data)
        .subscribe({
          next: (response) => {
            console.log('Usuario actualizado:', response);
            this.atras();
          },
          error: (err) => {
            console.error('Error al actualizar el usuario:', err);
          },
        });
    }
  }

  atras() {
    this.router.navigate([`/menu/mascota`]);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from 'src/app/core/services/datos/mascotas.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-datos-mascota',
  templateUrl: './datos-mascota.component.html',
  styleUrl: './datos-mascota.component.scss',
})
export class DatosMascotaComponent {
  selectedMascotaId: number = 0;
  esEdicion: boolean = false;
  tiposMascota: any[] = [];
  idUser: number | null = null;
  idNuevaMascota: number = 0;

  datosMascota: FormGroup = new FormGroup({});

  maxDate: string;

  data: {
    id_usuario: number;
    id_tipo: number;
    nombre_mascota: string;
    fecha_nac_mascota: string;
    nChip_mascota: string;
    raza_mascota: string;
  } = {
    id_usuario: 0,
    id_tipo: 1,
    nombre_mascota: '',
    fecha_nac_mascota: '',
    nChip_mascota: '',
    raza_mascota: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mascotasService: MascotasService,
    private tokenService: TokenService
  ) {
    this.datosMascota = this.fb.group({
      id_tipo: ['', Validators.required],
      nombre_mascota: ['', Validators.required],
      fecha_nac_mascota: ['', Validators.required],
      nChip_mascota: ['', Validators.required],
      raza_mascota: ['', Validators.required],
    });

    this.mascotasService.getTiposMascota().subscribe({
      next: (data) => {
        this.tiposMascota = data.results;
      },
      error: (err) => {
        console.error('Error al cargar los tipos de mascota:', err);
      },
    });

    this.idUser = this.tokenService.getUserIdFromToken();

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.route.params.subscribe((params) => {
      if (params['id_mascota']) {
        this.selectedMascotaId = +params['id_mascota'];
        this.esEdicion = true;
        this.cargarDatos();
      }
    });
  }

  cargarDatos() {
    this.mascotasService.getMascota(this.selectedMascotaId).subscribe({
      next: (data) => {
        //console.log(data);
        this.data = data.results[0];

        this.datosMascota.patchValue({ id_tipo: this.data.id_tipo });
        this.datosMascota.patchValue({
          nombre_mascota: this.data.nombre_mascota,
        });
        this.datosMascota.patchValue({
          fecha_nac_mascota: this.data.fecha_nac_mascota,
        });
        this.datosMascota.patchValue({
          nChip_mascota: this.data.nChip_mascota,
        });
        this.datosMascota.patchValue({ raza_mascota: this.data.raza_mascota });
      },
      error: (err) => {
        console.error('Error al cargar la mascota:', err);
      },
    });
  }

  recogerDatos(event: Event | string, input: string) {
    if (this.idUser !== null) {
      /* id_usuario */
      this.data.id_usuario = this.idUser;

      if (typeof event !== 'string') {
        /* id_tipo */
        if (input == 'tipo') {
          const selectElement = event.target as HTMLSelectElement;
          const selectedValue = +selectElement.value;

          this.data.id_tipo = selectedValue;
        }
      }

      if (typeof event === 'string') {
        /* nombre_mascota */
        if (input == 'nombre') {
          this.data.nombre_mascota = event;
        }

        /* nChip_mascota */
        if (input == 'chip') {
          this.data.nChip_mascota = event;
        }

        /* raza_mascota */
        if (input == 'raza') {
          this.data.raza_mascota = event;
        }
      }

      if (typeof event === 'object') {
        /* fecha_nac_mascota */
        if (input === 'fecha') {
          const fecha = (event as any).value || event;
          if (fecha instanceof Date) {
            const year = fecha.getFullYear();
            const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
            const day = fecha.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            this.data.fecha_nac_mascota = formattedDate;
          }
        }
      }

      console.log(this.data);
    }
  }

  onSubmit() {
    if (this.datosMascota.valid) {
      if (!this.esEdicion) {
        this.mascotasService
          .addMascota(this.data, sessionStorage['authToken'])
          .subscribe({
            next: (data) => {
              console.log('Registro exitoso:', data);
              this.idNuevaMascota = data.results.lastId;
              this.atras();
            },
            error: (err) => {
              console.error('Error en el registro:', err);
            },
          });
      } else {
        this.mascotasService
          .updateMascota(
            this.selectedMascotaId,
            sessionStorage['authToken'],
            this.data
          )
          .subscribe({
            next: (response) => {
              console.log('Mascota actualizada:', response);
              this.atras();
            },
            error: (err) => {
              console.error('Error al actualizar la mascota:', err);
            },
          });
      }
    }
  }

  deleteMascota() {
    this.mascotasService
      .deleteMascota(this.selectedMascotaId, sessionStorage['authToken'])
      .subscribe({
        next: (data) => {
          console.log('Borrado exitoso:', data);
          this.selectedMascotaId = 0;
          this.atras();
        },
        error: (err) => {
          console.error('Error en el borrado:', err);
          console.log(this.selectedMascotaId);
        },
      });
  }

  atras() {
    if (this.idNuevaMascota != 0) {
      this.router.navigate([`/menu/mascota/${this.idNuevaMascota}`]);
    } else {
      if (this.selectedMascotaId != 0) {
        this.router.navigate([`/menu/mascota/${this.selectedMascotaId}`]);
      } else {
        this.router.navigate([`/menu/mascota`]);
      }
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialesService } from 'src/app/core/services/datos/historiales.service';
import { MascotasService } from 'src/app/core/services/datos/mascotas.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss',
})
export class HistorialComponent {
  datosHistorial: FormGroup = new FormGroup({});

  data: {
    id_mascota: number;
    id_cita: number;
    fecha_y_hora: string;
    motivo: string;
    anotaciones: string;
  } = {
    id_mascota: 0,
    id_cita: 0,
    fecha_y_hora: '',
    motivo: '',
    anotaciones: '',
  };

  selectedMascotaId: number = 0;
  nombreMascota: string = '';
  selectedHistorialId: number = 0;
  selectedCitaId: number = 0;

  esEdicion: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private historialesService: HistorialesService,
    private mascotasService: MascotasService
  ) {
    this.datosHistorial = this.fb.group({
      id_mascota: [''],
      fecha_y_hora: [''],
      motivo: ['', Validators.required],
      anotaciones: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedMascotaId = +params['id_mascota'];

      this.mascotasService.getMascota(this.selectedMascotaId).subscribe({
        next: (data) => {
          this.nombreMascota = data.results[0].nombre_mascota;
          const hoy = new Date();

          if (params['id_cita']) {
            this.selectedCitaId = +params['id_cita'];
          }

          if (params['id_historial']) {
            this.esEdicion = false;
            this.selectedHistorialId = +params['id_historial'];
            this.cargarDatosHistorial();
          } else {
            this.esEdicion = true;

            this.datosHistorial.patchValue({
              id_mascota: this.nombreMascota,
              fecha_y_hora: this.toISODate(hoy),
              motivo: '',
              anotaciones: '',
            });

            this.data = {
              id_mascota: this.selectedMascotaId,
              id_cita: this.selectedCitaId,
              fecha_y_hora: this.toISODate(hoy),
              motivo: '',
              anotaciones: '',
            };
          }
        },
        error: (err) => {
          console.error('Error al cargar la mascota:', err);
        },
      });
    });
  }

  toISODate(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const seconds = fecha.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  cargarDatosHistorial() {
    this.historialesService.getHistorial(this.selectedHistorialId).subscribe({
      next: (data) => {
        this.data = data.results[0];

        this.datosHistorial.patchValue({ id_mascota: this.nombreMascota });
        this.datosHistorial.patchValue({
          fecha_y_hora: this.data.fecha_y_hora,
        });
        this.datosHistorial.patchValue({ motivo: this.data.motivo });
        this.datosHistorial.patchValue({ anotaciones: this.data.anotaciones });
      },
      error: (err) => {
        console.error('Error al cargar el historial:', err);
      },
    });
  }

  recogerDatos(event: string, input: string) {
    if (input === 'motivo') {
      this.data.motivo = event;
    }

    if (input === 'anotaciones') {
      this.data.anotaciones = event;
    }

    console.log(this.data);
  }

  onSubmit() {
    this.historialesService
      .postHistorialMascota(this.data, sessionStorage['authToken'])
      .subscribe({
        next: (data) => {
          console.log('Registro exitoso:', data);
          this.router.navigate(['veterinario']);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
        },
      });
  }

  atras() {
    this.router.navigate([`/menu/historiales/${this.selectedMascotaId}`]);
  }
}

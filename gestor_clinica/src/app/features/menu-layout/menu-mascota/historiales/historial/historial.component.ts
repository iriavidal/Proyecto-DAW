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
    fecha_y_hora: string;
    motivo: string;
    anotaciones: string;
  } = {
    id_mascota: 0,
    fecha_y_hora: '',
    motivo: '',
    anotaciones: '',
  };

  selectedMascotaId: number = 0;
  nombreMascota: string = '';
  selectedHistorialId: number = 0;

  esEdicion: boolean = false;

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

    this.route.params.subscribe((params) => {
      this.selectedMascotaId = +params['id_mascota'];

      this.mascotasService.getMascota(this.selectedMascotaId).subscribe({
        next: (data) => {
          this.nombreMascota = data.results[0].nombre_mascota;
        },
        error: (err) => {
          console.error('Error al cargar la mascota:', err);
        },
      });

      if (params['id_historial']) {
        this.selectedHistorialId = +params['id_historial'];
        this.cargarDatosHistorial();
      } else {
        this.esEdicion = true;
      }
    });
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

  recogerDatos(event: Event, input: string) {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  atras() {
    this.router.navigate([`/menu/historiales/${this.selectedMascotaId}`]);
  }
}

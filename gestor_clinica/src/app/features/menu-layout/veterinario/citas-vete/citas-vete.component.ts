import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/core/services/datos/citas.service';
import { DialogMascotaComponent } from './dialog-mascota/dialog-mascota.component';

@Component({
  selector: 'app-citas-vete',
  templateUrl: './citas-vete.component.html',
  styleUrl: './citas-vete.component.scss',
})
export class CitasVeteComponent {
  fechaSeleccionada: Date | null = null;

  citas: any[] = [];
  citasDelDia: any[] = [];
  citasFuturas: any[] = [];

  constructor(
    private citasService: CitasService,
    private router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.citasService.getAllCitas().subscribe({
      next: (data) => {
        const now = new Date().getTime();
        this.citas = data.results
          .filter((cita: any) => new Date(cita.fecha_y_hora).getTime() > now)
          .sort((a: any, b: any) => {
            const dateA = new Date(a.fecha_y_hora).getTime();
            const dateB = new Date(b.fecha_y_hora).getTime();
            return dateA - dateB;
          });

        this.separarCitas();
      },
      error: (err) => console.error('Error al obtener las citas:', err),
    });
  }

  separarCitas(): void {
    const today = new Date();
    const fechaHoy = this.toISODate(today);

    // Filtrar las citas para el día actual
    this.citasDelDia = this.citas.filter((cita) => {
      const fechaCita = cita.fecha_y_hora.split(' ')[0];
      return fechaCita === fechaHoy;
    });

    // Filtrar las futuras citas
    this.citasFuturas = this.citas.filter((cita) => {
      const fechaCita = cita.fecha_y_hora.split(' ')[0];

      return fechaCita > fechaHoy;
    });
  }

  get citasFiltradas(): any[] {
    if (!this.fechaSeleccionada) {
      return this.citasFuturas;
    }

    const fechaFiltro = this.toISODate(this.fechaSeleccionada);

    return this.citasFuturas.filter((cita) => {
      const fechaCita = cita.fecha_y_hora.split(' ')[0];
      return fechaCita === fechaFiltro;
    });
  }

  // Método auxiliar para convertir la fecha seleccionada a `YYYY-MM-DD` usando hora local
  toISODate(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  actualizarFiltro(): void {
    console.log(`Filtro actualizado: ${this.fechaSeleccionada}`);
  }

  perfilMascota(idCita: number): void {
    const cita = this.citas.find((cita) => cita.id_cita === idCita);

    if (cita) {
      const dialogRef = this._dialog.open(DialogMascotaComponent, {
        data: {
          idCita: cita.id_cita,
          idMascota: cita.id_mascota,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('El diálogo se cerró. Resultado:', result);
      });
    }
  }

  crearHistorial(idMascota: number, idCita: number) {
    this.router.navigate(['veterinario/historial', idMascota, idCita]);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from 'src/app/core/services/datos/citas.service';
import { MascotasService } from 'src/app/core/services/datos/mascotas.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-citas-mascotas',
  templateUrl: './citas-mascotas.component.html',
  styleUrl: './citas-mascotas.component.scss',
})
export class CitasMascotasComponent {
  selectedMascotaId: number | null = null; // ID de la mascota seleccionada
  listadoMascotas: any[] = []; // Todas las mascotas del usuario
  userId: number | null = null; // ID del usuario logueado

  citas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private mascotasService: MascotasService,
    private citasService: CitasService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id_mascota']) {
        this.selectedMascotaId = +params['id_mascota'];
      }
    });

    this.loadMascotas();
  }

  loadMascotas(): void {
    this.userId = this.tokenService.getUserIdFromToken();

    if (this.userId) {
      this.mascotasService.getMascotasUser(this.userId).subscribe({
        next: (data) => {
          if (data.results && data.results.length > 0) {
            this.listadoMascotas = data.results;

            if (this.selectedMascotaId == null) {
              this.selectedMascotaId = this.listadoMascotas[0].id_mascota;
            }

            this.loadCitas();
          } else {
            console.error('No se encontraron mascotas para este usuario.');
          }
        },
        error: (err) => console.error('Error al obtener las mascotas:', err),
      });
    } else {
      console.error('No se pudo obtener el ID del usuario desde el token.');
    }
  }

  loadCitas(): void {
    if (this.selectedMascotaId != null) {
      this.citasService.getCitasMascota(this.selectedMascotaId).subscribe({
        next: (data) => {
          if (data.results && data.results.length > 0) {
            const now = new Date();

            this.citas = data.results
              .filter((cita: any) => {
                const citaDate = new Date(cita.fecha_y_hora);
                const citaDateWithoutTime = new Date(
                  citaDate.getFullYear(),
                  citaDate.getMonth(),
                  citaDate.getDate()
                );
                const nowWithoutTime = new Date(
                  now.getFullYear(),
                  now.getMonth(),
                  now.getDate()
                );

                return citaDateWithoutTime >= nowWithoutTime;
              })
              .sort((a: any, b: any) => {
                const dateA = new Date(a.fecha_y_hora).getTime();
                const dateB = new Date(b.fecha_y_hora).getTime();
                return dateA - dateB;
              });

            this.citas.forEach((cita: any) => {
              const citaTime = new Date(cita.fecha_y_hora).getTime();
              cita.isCitaPasada = citaTime <= now.getTime();
            });
          } else {
            this.citas = [];
            console.error('No se encontraron citas para esta mascota.');
          }
        },
        error: (err) => {
          this.citas = [];
          console.error('Error al obtener las citas:', err);
        },
      });
    } else {
      this.router.navigate(['/menu']);
    }
  }

  onMascotaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedMascotaId = Number(selectElement.value);

    console.log('Mascota seleccionada:', this.selectedMascotaId);

    this.loadCitas();
  }

  atras() {
    this.router.navigate([`/menu/mascota/${this.selectedMascotaId}`]);
  }

  editarCita(citaId: number) {
    this.router.navigate([`/menu/cita/${this.selectedMascotaId}/${citaId}`]);
  }

  addCita() {
    this.router.navigate([`/menu/cita/${this.selectedMascotaId}`]);
  }

  eliminarCita(citaId: number) {
    this.citasService
      .deleteCita(citaId, sessionStorage['authToken'])
      .subscribe({
        next: (data) => {
          console.log('Borrado exitoso:', data);
          this.loadCitas();
        },
        error: (err) => {
          console.error('Error en el borrado:', err);
        },
      });
  }
}

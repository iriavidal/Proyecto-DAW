import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialesService } from 'src/app/core/services/datos/historiales.service';
import { MascotasService } from 'src/app/core/services/datos/mascotas.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrl: './historiales.component.scss',
})
export class HistorialesComponent {
  selectedMascotaId: number | null = null; // ID de la mascota seleccionada
  listadoMascotas: any[] = []; // Todas las mascotas del usuario
  userId: number | null = null; // ID del usuario logueado

  historiales: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private mascotasService: MascotasService,
    private historialesService: HistorialesService,
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

            this.loadHistoriales();
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

  loadHistoriales(): void {
    if (this.selectedMascotaId != null) {
      this.historialesService
        .getHistorialesMascota(this.selectedMascotaId)
        .subscribe({
          next: (data) => {
            if (data.results && data.results.length > 0) {
              // Ordenar citas por fecha
              this.historiales = data.results.sort((a: any, b: any) => {
                const dateA = new Date(a.fecha_y_hora).getTime();
                const dateB = new Date(b.fecha_y_hora).getTime();
                return dateA - dateB;
              });
            } else {
              this.historiales = [];
              console.error('No se encontraron historiales para esta mascota.');
            }
          },
          error: (err) => {
            this.historiales = [];
            console.error('Error al obtener las historiales:', err);
          },
        });
    } else {
      this.router.navigate(['/menu']);
    }
  }

  onMascotaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedMascotaId = Number(selectElement.value);

    console.log('Mascota seleccionada:', this.selectedMascotaId); // Verificar el ID seleccionado

    this.loadHistoriales();
  }

  verHistorial(idHistorial: number) {
    this.router.navigate([
      `/menu/historial/${this.selectedMascotaId}/${idHistorial}`,
    ]);
  }

  atras() {
    this.router.navigate([`/menu/mascota/${this.selectedMascotaId}`]);
  }
}

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
    this.loadCitas();
  }

  loadMascotas(): void {
    this.userId = this.tokenService.getUserIdFromToken();

    if (this.userId) {
      this.mascotasService.getMascotasUser(this.userId).subscribe({
        next: (data) => {
          if (data.results && data.results.length > 0) {
            this.listadoMascotas = data.results;
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
            this.citas = data.results;
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

    console.log('Mascota seleccionada:', this.selectedMascotaId); // Verificar el ID seleccionado

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
    console.log(`Eliminar cita: ${citaId}`);
  }
}

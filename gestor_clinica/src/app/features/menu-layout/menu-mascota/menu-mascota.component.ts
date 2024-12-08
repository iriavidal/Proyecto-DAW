import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from 'src/app/core/services/datos/mascotas.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-menu-mascota',
  templateUrl: './menu-mascota.component.html',
  styleUrl: './menu-mascota.component.scss',
})
export class MenuMascotaComponent {
  selectedMascotaId: number | null = null; // ID de la mascota seleccionada
  listadoMascotas: any[] = []; // Todas las mascotas del usuario
  userId: number | null = null; // ID del usuario logueado

  constructor(
    private route: ActivatedRoute,
    private mascotasService: MascotasService,
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
            console.log(this.listadoMascotas.length);

            if (this.selectedMascotaId == null) {
              this.selectedMascotaId = this.listadoMascotas[0].id_mascota;
            }
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

  onMascotaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedMascotaId = Number(selectElement.value);
  }

  irA(idMascota: number | null, boton: string) {
    if (boton == 'citas') {
      this.router.navigate(['/menu/citas', idMascota]);
    }

    if (boton == 'historiales') {
      this.router.navigate(['/menu/historiales', idMascota]);
    }

    if (boton == 'datos') {
      this.router.navigate(['/menu/datos', this.userId, idMascota]);
    }
  }

  addMascota() {
    this.router.navigate(['/menu/datos-mascota']);
  }
}

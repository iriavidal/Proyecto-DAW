import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotasService } from 'src/app/services/datos/mascotas.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss'],
})
export class MascotasComponent implements OnInit {
  listadoMascotas: any[] = [];
  userId: number | null = null;
  ultimasCitas: { [key: number]: string } = {}; // Clave: id_mascota, Valor: última cita

  constructor(
    private tokenService: TokenService,
    private mascotasService: MascotasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserIdFromToken();

    if (this.userId) {
      this.mascotasService.getMascotasUser(this.userId).subscribe({
        next: (data) => {
          if (data.results && data.results.length > 0) {
            this.listadoMascotas = data.results;

            this.listadoMascotas.forEach((mascota) => {
              this.mascotasService.getUltimaCita(mascota.id_mascota).subscribe({
                next: (data) => {
                  if (data.results && data.results.length > 0) {
                    this.ultimasCitas[mascota.id_mascota] =
                      data.results[0].fecha_y_hora;
                  } else {
                    this.ultimasCitas[mascota.id_mascota] = 'nunca';
                  }
                },
                error: () => {
                  this.ultimasCitas[mascota.id_mascota] = 'nunca';
                },
              });
            });
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

  irAlMenuMascota(idMascota: number): void {
    this.router.navigate(['/mascotas/menu', idMascota]);
  }
}

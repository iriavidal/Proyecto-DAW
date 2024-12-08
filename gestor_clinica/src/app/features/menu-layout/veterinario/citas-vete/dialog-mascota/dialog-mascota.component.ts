import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogPrivacidadComponent } from 'src/app/layout/footer/componentes/dialog-privacidad/dialog-privacidad.component';
import { MascotasComponent } from '../../../mascotas/mascotas.component';
import { MascotasService } from 'src/app/core/services/datos/mascotas.service';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { HistorialesService } from 'src/app/core/services/datos/historiales.service';
import { TiposService } from 'src/app/core/services/datos/tipos.service';

@Component({
  selector: 'app-dialog-mascota',
  templateUrl: './dialog-mascota.component.html',
  styleUrl: './dialog-mascota.component.scss',
})
export class DialogMascotaComponent {
  idCita: number | null = null;
  idMascota: number | null = null;

  mascota: any | null = null;
  usuario: any | null = null;
  historiales: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mascotasService: MascotasService,
    private usuariosService: UsuariosService,
    private historialesService: HistorialesService,
    private tiposService: TiposService
  ) {
    console.log('ID Cita:', data.idCita);
    this.idCita = data.idCita;
    console.log('ID Mascota:', data.idMascota);
    this.idMascota = data.idMascota;
  }

  ngOnInit(): void {
    if (this.idMascota) {
      this.mascotasService.getMascota(this.idMascota).subscribe({
        next: (data) => {
          this.mascota = data.results[0];
          console.log(this.mascota);

          this.tiposService.getTipoMascota(data.results[0].id_tipo).subscribe({
            next: (data) => {
              this.mascota.id_tipo = data.results[0].tipo;
            },
            error: (err) => console.error(err),
          });

          this.usuariosService
            .getUsuario(data.results[0].id_usuario)
            .subscribe({
              next: (data) => {
                this.usuario = data.results[0];
                console.log(this.usuario);
              },
              error: (err) => console.error(err),
            });

          this.historialesService
            .getHistorialesMascota(data.results[0].id_mascota)
            .subscribe({
              next: (data) => {
                console.log(data.results);
                this.historiales = data.results;
              },
              error: (err) => console.error(err),
            });
        },
        error: (err) => console.error(err),
      });
    }
  }
}

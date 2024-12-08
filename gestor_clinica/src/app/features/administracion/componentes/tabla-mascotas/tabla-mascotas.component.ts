import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MascotasService } from 'src/app/core/services/datos/mascotas.service';
import { DialogMascotasComponent } from 'src/app/features/administracion/componentes/tabla-mascotas/dialog-mascotas/dialog-mascotas.component';

@Component({
  selector: 'app-tabla-mascotas',
  templateUrl: './tabla-mascotas.component.html',
  styleUrl: './tabla-mascotas.component.scss',
})
export class TablaMascotasComponent {
  filterUser = '';
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'ID',
    'IDuser',
    'IDtipo',
    'nombre_mascota',
    'fecha_nac_mascota',
    'nChip_mascota',
    'raza_mascota',
    'Actions',
  ];

  constructor(
    private _dialog: MatDialog,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  private loadStatus() {
    this.mascotasService.getAllMascotas().subscribe({
      next: (data: any) => {
        this.dataSource = data.results;
        console.log(data.results);
      },
      error: (err) => console.error(err),
    });
  }

  protected newStatus(): void {
    const status: any = {
      rol: '',
    };
    const dialogRef = this._dialog.open(DialogMascotasComponent, {
      data: { isEditable: false, status: status, checkNew: true },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadStatus();
      }
    });
  }

  protected deleteStatus(item: any) {
    this.mascotasService
      .deleteMascota(item.id_mascota, sessionStorage['authToken'])
      .subscribe({
        next: (data) => {
          console.log(data);
          this.loadStatus();
        },
        error: (err) => console.error(err),
      });
  }
}

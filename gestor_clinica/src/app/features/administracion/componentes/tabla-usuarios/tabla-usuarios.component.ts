import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { DialogUsuariosComponent } from './dialog-usuarios/dialog-usuarios.component';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss',
})
export class TablaUsuariosComponent {
  filterUser = '';
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'ID',
    'Nombre',
    'Apellidos',
    'Email',
    'DNI',
    'Direccion',
    'IDrol',
    'Actions',
  ];

  constructor(
    private _dialog: MatDialog,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  private loadStatus() {
    this.usuariosService.getAllUsuarios().subscribe({
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
    const dialogRef = this._dialog.open(DialogUsuariosComponent, {
      data: { isEditable: false, status: status, checkNew: true },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadStatus();
      }
    });
  }

  protected deleteStatus(item: any) {
    this.usuariosService
      .deleteUsuario(item.id_usuario, sessionStorage['authToken'])
      .subscribe({
        next: (data) => {
          console.log(data);
          this.loadStatus();
        },
        error: (err) => console.error(err),
      });
  }
}

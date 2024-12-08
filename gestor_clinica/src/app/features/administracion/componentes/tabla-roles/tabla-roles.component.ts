import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolesService } from 'src/app/core/services/datos/roles.service';
import { DialogRolesComponent } from './dialog-roles/dialog-roles.component';

@Component({
  selector: 'app-tabla-roles',
  templateUrl: './tabla-roles.component.html',
  styleUrl: './tabla-roles.component.scss',
})
export class TablaRolesComponent {
  filterUser = '';
  dataSource: any[] = [];
  displayedColumns: string[] = ['ID', 'Rol', 'Actions'];

  constructor(private _dialog: MatDialog, private rolesService: RolesService) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  private loadStatus() {
    this.rolesService.getAllRoles().subscribe({
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
    const dialogRef = this._dialog.open(DialogRolesComponent, {
      data: { isEditable: false, status: status, checkNew: true },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadStatus();
      }
    });
  }

  protected editStatus(item: any): void {
    const dialogRef = this._dialog.open(DialogRolesComponent, {
      data: { isEditable: true, status: item, checkNew: false },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadStatus();
      }
    });
  }

  protected deleteStatus(item: any) {
    this.rolesService
      .deleteRol(item.id_rol, sessionStorage['authToken'])
      .subscribe({
        next: (data) => {
          console.log(data);
          this.loadStatus();
        },
        error: (err) => console.error(err),
      });
  }
}

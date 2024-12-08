import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiposService } from 'src/app/core/services/datos/tipos.service';
import { DialogTiposComponent } from './dialog-tipos/dialog-tipos.component';

@Component({
  selector: 'app-tabla-tipos',
  templateUrl: './tabla-tipos.component.html',
  styleUrl: './tabla-tipos.component.scss',
})
export class TablaTiposComponent {
  filterUser = '';
  dataSource: any[] = [];
  displayedColumns: string[] = ['ID', 'Tipo', 'Actions'];

  constructor(private _dialog: MatDialog, private tiposService: TiposService) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  private loadStatus() {
    this.tiposService.getTiposMascota().subscribe({
      next: (data: any) => {
        this.dataSource = data.results;
        console.log(data.results);
      },
      error: (err) => console.error(err),
    });
  }

  protected newStatus(): void {
    const status: any = {
      tipo: '',
    };
    const dialogRef = this._dialog.open(DialogTiposComponent, {
      data: { isEditable: false, status: status, checkNew: true },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadStatus();
      }
    });
  }

  protected editStatus(item: any): void {
    const dialogRef = this._dialog.open(DialogTiposComponent, {
      data: { isEditable: true, status: item, checkNew: false },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadStatus();
      }
    });
  }

  protected deleteStatus(item: any) {
    this.tiposService
      .deleteTipo(item.id_tipo, sessionStorage['authToken'])
      .subscribe({
        next: (data) => {
          console.log(data);
          this.loadStatus();
        },
        error: (err) => console.error(err),
      });
  }
}

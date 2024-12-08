import { Component } from '@angular/core';
import { CitasService } from 'src/app/core/services/datos/citas.service';

@Component({
  selector: 'app-tabla-citas',
  templateUrl: './tabla-citas.component.html',
  styleUrl: './tabla-citas.component.scss',
})
export class TablaCitasComponent {
  filterUser = '';
  dataSource: any[] = [];
  displayedColumns: string[] = ['ID', 'IDmascota', 'tipo_cita', 'fecha_y_hora'];

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  private loadStatus() {
    this.citasService.getAllCitas().subscribe({
      next: (data: any) => {
        this.dataSource = data.results;
        console.log(data.results);
      },
      error: (err) => console.error(err),
    });
  }
}

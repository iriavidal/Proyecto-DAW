import { Component } from '@angular/core';
import { HistorialesService } from 'src/app/core/services/datos/historiales.service';

@Component({
  selector: 'app-tabla-historiales',
  templateUrl: './tabla-historiales.component.html',
  styleUrl: './tabla-historiales.component.scss',
})
export class TablaHistorialesComponent {
  filterUser = '';
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'ID',
    'IDcita',
    'IDmascota',
    'fecha_y_hora',
    'motivo',
    'anotaciones',
  ];

  constructor(private historialesService: HistorialesService) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  private loadStatus() {
    this.historialesService.getAllHistoriales().subscribe({
      next: (data: any) => {
        this.dataSource = data.results;
        console.log(data.results);
      },
      error: (err) => console.error(err),
    });
  }
}

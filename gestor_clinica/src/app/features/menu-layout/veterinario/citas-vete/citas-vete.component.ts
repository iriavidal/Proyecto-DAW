import { Component } from '@angular/core';
import { CitasService } from 'src/app/core/services/datos/citas.service';

@Component({
  selector: 'app-citas-vete',
  templateUrl: './citas-vete.component.html',
  styleUrl: './citas-vete.component.scss',
})
export class CitasVeteComponent {
  citas = [];

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.citasService.getAllCitas().subscribe({
      next: (data) => {
        console.log(data.results);
      },
      error: (err) => console.error('Error al obtener las citas:', err),
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss',
})
export class CitasComponent {
  cards: any[] = [
    {
      id: '1',
      titulo: 'Reservar citas',
      descripcion:
        'Lorem ipsum dolor sit amet consectetur. Purus maecenas id faucibus vitae eget venenatis.',
    },
    {
      id: '2',
      titulo: 'Modificar cita',
      descripcion:
        'Lorem ipsum dolor sit amet consectetur. Purus maecenas id faucibus vitae eget venenatis.',
    },
    {
      id: '3',
      titulo: 'Cancelar citas',
      descripcion:
        'Lorem ipsum dolor sit amet consectetur. Purus maecenas id faucibus vitae eget venenatis.',
    },
    {
      id: '4',
      titulo: 'Consultar historial médico',
      descripcion:
        'Lorem ipsum dolor sit amet consectetur. Purus maecenas id faucibus vitae eget venenatis.',
    },
  ];
}

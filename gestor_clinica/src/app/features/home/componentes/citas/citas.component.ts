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
        'Agenda una consulta médica de forma rápida y sencilla para cuidar de tu mascota.',
    },
    {
      id: '2',
      titulo: 'Modificar cita',
      descripcion:
        '¿Cambios de última hora? Ajusta la fecha y hora de tu cita según tus necesidades.',
    },
    {
      id: '3',
      titulo: 'Cancelar citas',
      descripcion:
        'Si no puedes asistir, cancela la cita fácilmente desde nuestra plataforma.',
    },
    {
      id: '4',
      titulo: 'Consultar historial médico',
      descripcion:
        'Accede al historial médico completo de tu mascota en cualquier momento.',
    },
  ];
}

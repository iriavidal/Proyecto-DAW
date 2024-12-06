import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.scss',
})
export class EquipoComponent {
  equipo = [
    {
      nombre: 'Dra. Ana García',
      puesto: 'Especialista en cirugía veterinaria',
      src: 'https://images.pexels.com/photos/6131096/pexels-photo-6131096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      nombre: 'Dr. Juan Pérez',
      puesto: 'Veterinario general',
      src: 'https://images.pexels.com/photos/6234618/pexels-photo-6234618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      nombre: 'Marta López',
      puesto: 'Técnica veterinaria y auxiliar',
      src: 'https://images.pexels.com/photos/5731876/pexels-photo-5731876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
}

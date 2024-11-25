import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-mascota',
  templateUrl: './menu-mascota.component.html',
  styleUrl: './menu-mascota.component.scss',
})
export class MenuMascotaComponent {
  idMascota: number = 1;

  listadoMascotas = [
    {
      id_mascota: 1,
      nombre_mascota: 'Rex',
      tipo_mascota: 'perro',
      raza_mascota: 'Labrador',
      fecha_nac_mascota: '2020-05-10',
      nChip_mascota: '123456789012',
    },
    {
      id_mascota: 2,
      nombre_mascota: 'Miau',
      tipo_mascota: 'gato',
      raza_mascota: 'Siamés',
      fecha_nac_mascota: '2021-08-15',
      nChip_mascota: '987654321098',
    },
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent {
  cards: any[] = [
    {
      titulo: 'Consulta general',
      subtitulo: 'Revisión médica completa para tu mascota',
      src: 'https://cdn.pixabay.com/photo/2019/08/05/11/58/health-4385852_1280.jpg',
    },
    {
      titulo: 'Vacunación',
      subtitulo: 'Protege a tu mascota de enfermedades comunes',
      src: 'https://cdn.pixabay.com/photo/2020/04/04/19/52/medicine-5003631_1280.jpg',
    },
    {
      titulo: 'Peluquería y estética',
      subtitulo: 'Mantén a tu mascota limpia y saludable',
      src: 'https://cdn.pixabay.com/photo/2016/02/10/12/53/dog-1191662_1280.jpg',
    },
  ];
}

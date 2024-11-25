import { Component } from '@angular/core';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss',
})
export class MarcasComponent {
  marcas = [
    {
      marca: 'Chemical Ibérica',
      src: 'https://www.chemicaliberica.com/users/image/imagen_1572000010.jpg',
    },
    {
      marca: 'Boehringer Ingelheim',
      src: 'https://d1.awsstatic.com/BI%20123.a09f6588b5a40241866a90f072ed8986b2d02d71.png',
    },
    {
      marca: 'Royal Canin',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Royal-Canin-Logo.svg/1200px-Royal-Canin-Logo.svg.png',
    },
    {
      marca: 'Affinity Advance',
      src: 'https://static-shop.vivapets.com/media/amasty/shopby/option_images/advance.jpg',
    },
    {
      marca: 'Bayer',
      src: 'https://www.rrhhdigital.com/wp-content/uploads/userfiles/bayer_logo_fuera.jpg',
    },
    {
      marca: 'Purina',
      src: 'https://www.purina.com.bo/themes/custom/purina/purina/assets/images/logo/red-new/logo.png',
    },
  ];
}

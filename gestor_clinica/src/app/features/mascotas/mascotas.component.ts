import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss',
})
export class MascotasComponent {
  @Input() listadoMascotas: any[] = [];

  ngOnInit(): void {
    console.log(this.listadoMascotas);
  }
}

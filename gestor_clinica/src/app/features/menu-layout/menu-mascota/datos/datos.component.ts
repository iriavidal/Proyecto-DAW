import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss',
})
export class DatosComponent {
  selectedMascotaId: number = 0;
  userId: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id_mascota']) {
        this.selectedMascotaId = +params['id_mascota'];
      }
      if (params['id_usuario']) {
        this.userId = +params['id_usuario'];
      }
    });

    console.log(this.userId);
    console.log(this.selectedMascotaId);
  }

  irA(input: string) {
    if (input == 'usuario') {
      this.router.navigate([`/menu/datos-user/${this.userId}`]);
    }

    if (input == 'mascota') {
      this.router.navigate([`/menu/datos-mascota/${this.selectedMascotaId}`]);
    }
  }

  atras() {
    this.router.navigate([`/menu/mascota/${this.selectedMascotaId}`]);
  }
}

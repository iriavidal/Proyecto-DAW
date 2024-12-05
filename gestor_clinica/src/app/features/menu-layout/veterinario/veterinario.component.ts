import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrl: './veterinario.component.scss',
})
export class VeterinarioComponent {
  userId: number | null = null;
  userName: string = '';

  constructor(
    private usuarioService: UsuariosService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserIdFromToken();

    if (this.userId) {
      this.usuarioService.getUsuario(this.userId).subscribe({
        next: (data) => {
          if (data.results && data.results.length > 0) {
            this.userName = `${data.results[0].nombre_usuario} ${data.results[0].apellidos_usuario}`;
            //console.log(this.userName);
          } else {
            console.error('No se encontró al usuario.');
          }
        },
        error: (err) => console.error('Error al obtener el usuario:', err),
      });
    }
  }
}

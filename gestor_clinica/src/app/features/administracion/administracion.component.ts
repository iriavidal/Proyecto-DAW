import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.scss',
})
export class AdministracionComponent {
  usuario: any = {};

  constructor(
    private usuarioService: UsuariosService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.tokenService.getUserIdFromToken();

    if (id) {
      this.usuarioService.getUsuario(id).subscribe({
        next: (data) => {
          console.log(data.results[0]);
          this.usuario = data.results[0];
        },
        error: (err) => console.error(err),
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}

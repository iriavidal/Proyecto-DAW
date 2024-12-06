import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.scss',
})
export class HeaderUsuarioComponent {
  veterinario: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    const id = this.tokenService.getUserIdFromToken();

    if (id) {
      this.usuariosService.getUsuario(id).subscribe({
        next: (data) => {
          //console.log(data.results[0].id_rol);
          if (data.results[0].id_rol === 1) {
            /* Usuario cliente */
            this.veterinario = false;
          } else if (data.results[0].id_rol === 2) {
            /* Usuario veterinario */
            this.veterinario = true;
          }
        },
        error: (err) => console.error(err),
      });
    }
  }

  closeMenu(menuToggle: HTMLInputElement): void {
    menuToggle.checked = false;
  }

  irA(boton: string) {
    if (boton == 'citas') {
      this.router.navigate(['/menu/citas']);
    }

    if (boton == 'historiales') {
      this.router.navigate(['/menu/historiales']);
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }
}

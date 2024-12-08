import { Component, EventEmitter, Output } from '@angular/core';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header-inicio',
  templateUrl: './header-inicio.component.html',
  styleUrls: ['./header-inicio.component.scss'],
})
export class HeaderComponent {
  @Output() sectionScroll = new EventEmitter<string>();

  isLoggedIn: boolean = false;
  userRol: number | null = null;

  constructor(
    private tokenService: TokenService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!sessionStorage.getItem('authToken');
    const id = this.tokenService.getUserIdFromToken();
    if (id) {
      this.usuariosService.getUsuario(id).subscribe({
        next: (data) => {
          this.userRol = data.results[0].id_rol;
        },
        error: (err) => console.error(err),
      });
    }
  }

  scrollTo(section: string): void {
    this.sectionScroll.emit(section);
  }

  closeMenu(menuToggle: HTMLInputElement): void {
    menuToggle.checked = false;
  }

  irA() {
    if (this.isLoggedIn) {
      if (this.userRol === 1) {
        return '/menu';
      } else if (this.userRol === 2) {
        return '/veterinario';
      } else if (this.userRol === 3) {
        return '/administracion';
      }
    }
    return '/auth';
  }
}

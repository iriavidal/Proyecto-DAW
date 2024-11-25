import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.scss',
})
export class HeaderUsuarioComponent {
  constructor(private authService: AuthService) {}

  closeMenu(menuToggle: HTMLInputElement): void {
    menuToggle.checked = false;
  }

  cerrarSesion() {
    this.authService.logout();
  }
}

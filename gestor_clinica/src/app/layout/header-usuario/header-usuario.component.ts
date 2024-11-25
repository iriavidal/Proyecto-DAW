import { Component } from '@angular/core';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.scss',
})
export class HeaderUsuarioComponent {
  closeMenu(menuToggle: HTMLInputElement): void {
    menuToggle.checked = false;
  }

  cerrarSesion() {
    // Pendiente de enlazar a la API
    console.log('Intento de cierre de sesión');
  }
}

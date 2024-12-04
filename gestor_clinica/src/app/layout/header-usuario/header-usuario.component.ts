import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.scss',
})
export class HeaderUsuarioComponent {
  constructor(private authService: AuthService, private router: Router) {}

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

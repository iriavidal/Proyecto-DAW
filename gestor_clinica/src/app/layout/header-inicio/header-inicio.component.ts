import { Component } from '@angular/core';

@Component({
  selector: 'app-header-inicio',
  templateUrl: './header-inicio.component.html',
  styleUrls: ['./header-inicio.component.scss'],
})
export class HeaderComponent {
  closeMenu(menuToggle: HTMLInputElement): void {
    menuToggle.checked = false;
  }
}

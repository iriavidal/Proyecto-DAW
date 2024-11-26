import { Component } from '@angular/core';

@Component({
  selector: 'app-header-inicio',
  templateUrl: './header-inicio.component.html',
  styleUrls: ['./header-inicio.component.scss'],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = !!sessionStorage.getItem('authToken');
    console.log(this.isLoggedIn);
  }

  closeMenu(menuToggle: HTMLInputElement): void {
    menuToggle.checked = false;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
})
export class ContactoComponent {
  constructor(private router: Router) {}

  scrollToSection(section: string): void {
    this.router.navigate(['/']);
  }
}

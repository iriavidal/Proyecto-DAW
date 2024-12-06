import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('servicios', { static: false }) servicios!: ElementRef;
  @ViewChild('citas', { static: false }) citas!: ElementRef;
  @ViewChild('equipo', { static: false }) equipo!: ElementRef;
  @ViewChild('marcas', { static: false }) marcas!: ElementRef;
  @ViewChild('contacto', { static: false }) contacto!: ElementRef;

  scrollToSection(section: string): void {
    const sectionMap: { [key: string]: ElementRef } = {
      servicios: this.servicios,
      citas: this.citas,
      equipo: this.equipo,
      marcas: this.marcas,
      contacto: this.contacto,
    };

    const element = sectionMap[section];
    if (element) {
      element.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}

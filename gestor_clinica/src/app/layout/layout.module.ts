import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { DialogPrivacidadComponent } from './footer/componentes/dialog-privacidad/dialog-privacidad.component';
import { DialogAvisoLegalComponent } from './footer/componentes/dialog-aviso-legal/dialog-aviso-legal.component';
import { DialogCookiesComponent } from './footer/componentes/dialog-cookies/dialog-cookies.component';

@NgModule({
  declarations: [FooterComponent, DialogPrivacidadComponent, DialogAvisoLegalComponent, DialogCookiesComponent],
  imports: [CommonModule],
  exports: [FooterComponent],
})
export class LayoutModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { DialogPrivacidadComponent } from './footer/componentes/dialog-privacidad/dialog-privacidad.component';
import { DialogAvisoLegalComponent } from './footer/componentes/dialog-aviso-legal/dialog-aviso-legal.component';
import { DialogCookiesComponent } from './footer/componentes/dialog-cookies/dialog-cookies.component';
import { HeaderComponent } from './header-inicio/header-inicio.component';
import { RouterModule } from '@angular/router';
import { HeaderUsuarioComponent } from './header-usuario/header-usuario.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    DialogPrivacidadComponent,
    DialogAvisoLegalComponent,
    DialogCookiesComponent,
    HeaderUsuarioComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, HeaderComponent, HeaderUsuarioComponent],
})
export class LayoutModule {}

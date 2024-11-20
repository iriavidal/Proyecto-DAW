import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { TituloComponent } from './home/componentes/titulo/titulo.component';
import { ServiciosComponent } from './home/componentes/servicios/servicios.component';
import { CitasComponent } from './home/componentes/citas/citas.component';
import { CardComponent } from './home/componentes/citas/card/card.component';
import { EquipoComponent } from './home/componentes/equipo/equipo.component';
import { MarcasComponent } from './home/componentes/marcas/marcas.component';
import { ContactoComponent } from './home/componentes/contacto/contacto.component';

import { CardModule, CarouselModule } from '@coreui/angular';
import { RouterLink, RouterModule } from '@angular/router';
import { InViewDirective } from '../directives/in-view.directive';
import { LayoutModule } from '../layout/layout.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HomeLoginComponent } from './auth-layout/home-login/home-login.component';
import { LoginComponent } from './auth-layout/login/login.component';
import { RegisterComponent } from './auth-layout/register/register.component';

@NgModule({
  declarations: [
    HomeComponent,
    TituloComponent,
    ServiciosComponent,
    CitasComponent,
    CardComponent,
    EquipoComponent,
    MarcasComponent,
    ContactoComponent,
    InViewDirective,
    AuthLayoutComponent,
    HomeLoginComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CarouselModule,
    RouterLink,
    CardModule,
    LayoutModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}

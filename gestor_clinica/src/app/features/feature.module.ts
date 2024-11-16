import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/componentes/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { TituloComponent } from './home/componentes/titulo/titulo.component';
import { ServiciosComponent } from './home/componentes/servicios/servicios.component';
import { CitasComponent } from './home/componentes/citas/citas.component';
import { CardComponent } from './home/componentes/citas/card/card.component';
import { EquipoComponent } from './home/componentes/equipo/equipo.component';

import { CardModule, CarouselModule } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { MarcasComponent } from './home/componentes/marcas/marcas.component';
import { ContactoComponent } from './home/componentes/contacto/contacto.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    TituloComponent,
    ServiciosComponent,
    CitasComponent,
    CardComponent,
    EquipoComponent,
    MarcasComponent,
    ContactoComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CarouselModule,
    RouterLink,
    CardModule,
  ],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/componentes/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { TituloComponent } from './home/componentes/titulo/titulo.component';
import { ServiciosComponent } from './home/componentes/servicios/servicios.component';
import { CitasComponent } from './home/componentes/citas/citas.component';

import { CarouselModule } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    TituloComponent,
    ServiciosComponent,
    CitasComponent,
  ],
  imports: [CommonModule, MatIconModule, CarouselModule, RouterLink],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}

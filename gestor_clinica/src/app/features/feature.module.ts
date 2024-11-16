import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/componentes/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { TituloComponent } from './home/componentes/titulo/titulo.component';
import { ServiciosComponent } from './home/componentes/servicios/servicios.component';

import { CarouselModule } from '@coreui/angular';

import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    TituloComponent,
    ServiciosComponent,
  ],
  imports: [BrowserModule, MatIconModule, CarouselModule, RouterLink],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}

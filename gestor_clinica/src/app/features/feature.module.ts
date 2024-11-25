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
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MascotasComponent } from './mascotas/mascotas.component';
import { MenuMascotaComponent } from './mascotas/menu-mascota/menu-mascota.component';
import { HttpClientModule } from '@angular/common/http';

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
    MascotasComponent,
    MenuMascotaComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CarouselModule,
    RouterLink,
    CardModule,
    LayoutModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}

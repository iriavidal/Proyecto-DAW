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
import { InViewDirective } from '../core/directives/in-view.directive';
import { LayoutModule } from '../layout/layout.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HomeLoginComponent } from './auth-layout/home-login/home-login.component';
import { LoginComponent } from './auth-layout/login/login.component';
import { RegisterComponent } from './auth-layout/register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MascotasComponent } from './menu-layout/mascotas/mascotas.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuMascotaComponent } from './menu-layout/menu-mascota/menu-mascota.component';
import { MenuLayoutComponent } from './menu-layout/menu-layout.component';
import { CitasMascotasComponent } from './menu-layout/menu-mascota/citas/citas-mascotas.component';
import { CoreModule } from '../core/core.module';
import { PostCitaComponent } from './menu-layout/menu-mascota/citas/post-cita/post-cita.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DatosMascotaComponent } from './menu-layout/datos-mascota/datos-mascota.component';

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
    MenuLayoutComponent,
    CitasComponent,
    CitasMascotasComponent,
    PostCitaComponent,
    DatosMascotaComponent,
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
    FormsModule,
    CoreModule,
    MatStepperModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }], // dd/mm/yyyy
  bootstrap: [],
})
export class FeatureModule {}

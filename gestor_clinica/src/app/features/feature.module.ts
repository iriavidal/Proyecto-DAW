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
import { HistorialesComponent } from './menu-layout/menu-mascota/historiales/historiales.component';
import { HistorialComponent } from './menu-layout/menu-mascota/historiales/historial/historial.component';
import { DatosComponent } from './menu-layout/menu-mascota/datos/datos.component';
import { DatosUserComponent } from './menu-layout/menu-mascota/datos/datos-user/datos-user.component';
import { VeterinarioComponent } from './menu-layout/veterinario/veterinario.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CitasVeteComponent } from './menu-layout/veterinario/citas-vete/citas-vete.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogMascotaComponent } from './menu-layout/veterinario/citas-vete/dialog-mascota/dialog-mascota.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { TablaRolesComponent } from './administracion/componentes/tabla-roles/tabla-roles.component';
import { MatTableModule } from '@angular/material/table';
import { DialogRolesComponent } from './administracion/componentes/tabla-roles/dialog-roles/dialog-roles.component';
import { TablaUsuariosComponent } from './administracion/componentes/tabla-usuarios/tabla-usuarios.component';
import { DialogUsuariosComponent } from './administracion/componentes/tabla-usuarios/dialog-usuarios/dialog-usuarios.component';
import { TablaTiposComponent } from './administracion/componentes/tabla-tipos/tabla-tipos.component';
import { DialogTiposComponent } from './administracion/componentes/tabla-tipos/dialog-tipos/dialog-tipos.component';
import { TablaMascotasComponent } from './administracion/componentes/tabla-mascotas/tabla-mascotas.component';
import { DialogMascotasComponent } from './administracion/componentes/tabla-mascotas/dialog-mascotas/dialog-mascotas.component';
import { TablaCitasComponent } from './administracion/componentes/tabla-citas/tabla-citas.component';
import { TablaHistorialesComponent } from './administracion/componentes/tabla-historiales/tabla-historiales.component';

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
    HistorialesComponent,
    HistorialComponent,
    DatosComponent,
    DatosUserComponent,
    VeterinarioComponent,
    CitasVeteComponent,
    DialogMascotaComponent,
    AdministracionComponent,
    TablaRolesComponent,
    DialogRolesComponent,
    TablaUsuariosComponent,
    DialogUsuariosComponent,
    TablaTiposComponent,
    DialogTiposComponent,
    TablaMascotasComponent,
    DialogMascotasComponent,
    TablaCitasComponent,
    TablaHistorialesComponent,
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
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }], // dd/mm/yyyy
  bootstrap: [],
})
export class FeatureModule {}

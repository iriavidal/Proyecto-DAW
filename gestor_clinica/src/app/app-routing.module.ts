import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ContactoComponent } from './features/home/componentes/contacto/contacto.component';
import { AuthLayoutComponent } from './features/auth-layout/auth-layout.component';
import { HomeLoginComponent } from './features/auth-layout/home-login/home-login.component';
import { LoginComponent } from './features/auth-layout/login/login.component';
import { RegisterComponent } from './features/auth-layout/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MenuMascotaComponent } from './features/menu-layout/menu-mascota/menu-mascota.component';
import { MenuLayoutComponent } from './features/menu-layout/menu-layout.component';
import { MascotasComponent } from './features/menu-layout/mascotas/mascotas.component';
import { CitasMascotasComponent } from './features/menu-layout/menu-mascota/citas/citas-mascotas.component';
import { PostCitaComponent } from './features/menu-layout/menu-mascota/citas/post-cita/post-cita.component';
import { DatosMascotaComponent } from './features/menu-layout/datos-mascota/datos-mascota.component';
import { HistorialesComponent } from './features/menu-layout/menu-mascota/historiales/historiales.component';
import { HistorialComponent } from './features/menu-layout/menu-mascota/historiales/historial/historial.component';
import { DatosComponent } from './features/menu-layout/menu-mascota/datos/datos.component';
import { DatosUserComponent } from './features/menu-layout/menu-mascota/datos/datos-user/datos-user.component';
import { AuthClienteGuard } from './core/guards/auth-cliente.guard';
import { AuthVeterinarioGuard } from './core/guards/auth-veterinario.guard';
import { VeterinarioComponent } from './features/menu-layout/veterinario/veterinario.component';
import { AdministracionComponent } from './features/administracion/administracion.component';
import { AuthTecnicoGuard } from './core/guards/auth-tecnico.guard';
import { TablaRolesComponent } from './features/administracion/componentes/tabla-roles/tabla-roles.component';
import { TablaUsuariosComponent } from './features/administracion/componentes/tabla-usuarios/tabla-usuarios.component';
import { TablaTiposComponent } from './features/administracion/componentes/tabla-tipos/tabla-tipos.component';
import { TablaMascotasComponent } from './features/administracion/componentes/tabla-mascotas/tabla-mascotas.component';
import { TablaCitasComponent } from './features/administracion/componentes/tabla-citas/tabla-citas.component';
import { TablaHistorialesComponent } from './features/administracion/componentes/tabla-historiales/tabla-historiales.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: HomeLoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'menu',
    component: MenuLayoutComponent,
    canActivate: [AuthGuard, AuthClienteGuard],
    children: [
      {
        path: '',
        component: MascotasComponent,
      },
      {
        path: 'mascota',
        component: MenuMascotaComponent,
      },
      {
        path: 'mascota/:id_mascota',
        component: MenuMascotaComponent,
      },
      {
        path: 'citas',
        component: CitasMascotasComponent,
      },
      {
        path: 'citas/:id_mascota',
        component: CitasMascotasComponent,
      },
      {
        path: 'cita/:id_mascota',
        component: PostCitaComponent,
      },
      {
        path: 'cita/:id_mascota/:id_cita',
        component: PostCitaComponent,
      },
      {
        path: 'historiales/:id_mascota',
        component: HistorialesComponent,
      },
      {
        path: 'historiales',
        component: HistorialesComponent,
      },
      {
        path: 'historial/:id_mascota/:id_historial',
        component: HistorialComponent,
      },
      {
        path: 'datos/:id_usuario/:id_mascota',
        component: DatosComponent,
      },
      {
        path: 'datos-mascota/:id_mascota',
        component: DatosMascotaComponent,
      },
      {
        path: 'datos-user/:id_usuario',
        component: DatosUserComponent,
      },
      {
        path: 'datos-mascota',
        component: DatosMascotaComponent,
      },
    ],
  },

  {
    path: 'veterinario',
    component: MenuLayoutComponent,
    canActivate: [AuthGuard, AuthVeterinarioGuard],
    children: [
      {
        path: '',
        component: VeterinarioComponent,
      },
      {
        path: 'historial/:id_mascota/:id_cita',
        component: HistorialComponent,
      },
    ],
  },
  {
    path: 'administracion',
    component: AdministracionComponent,
    canActivate: [AuthGuard, AuthTecnicoGuard],
    children: [
      { path: 'roles', component: TablaRolesComponent },
      { path: 'usuarios', component: TablaUsuariosComponent },
      { path: 'tipos', component: TablaTiposComponent },
      { path: 'mascotas', component: TablaMascotasComponent },
      { path: 'citas', component: TablaCitasComponent },
      { path: 'historiales', component: TablaHistorialesComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

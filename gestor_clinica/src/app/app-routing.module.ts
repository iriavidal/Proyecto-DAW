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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MascotasComponent,
      },
      {
        path: 'mascota',
        component: MenuMascotaComponent,
        // Recordar añadir los hijos cuando se tenga un componente para envolverlos
      },
      {
        path: 'mascota/:id_mascota',
        component: MenuMascotaComponent,
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
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

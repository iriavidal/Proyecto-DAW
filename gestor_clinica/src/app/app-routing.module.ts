import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ContactoComponent } from './features/home/componentes/contacto/contacto.component';
import { AuthLayoutComponent } from './features/auth-layout/auth-layout.component';
import { HomeLoginComponent } from './features/auth-layout/home-login/home-login.component';
import { LoginComponent } from './features/auth-layout/login/login.component';
import { RegisterComponent } from './features/auth-layout/register/register.component';
import { MascotasComponent } from './features/mascotas/mascotas.component';
import { MenuMascotaComponent } from './features/menu-mascota/menu-mascota.component';
import { AuthGuard } from './guards/auth.guard';

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
    path: 'mascotas',
    component: MascotasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mascotas/menu',
    component: MenuMascotaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mascotas/menu/:id_mascota',
    component: MenuMascotaComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

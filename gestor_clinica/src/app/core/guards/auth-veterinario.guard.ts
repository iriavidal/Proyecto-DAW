import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthVeterinarioGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const userId = this.tokenService.getUserIdFromToken();
    if (!userId) {
      this.router.navigate(['/login']);
      return new Observable<boolean>((observer) => observer.next(false));
    }

    return this.usuariosService.getUsuario(userId).pipe(
      map((data: any) => {
        if (data.results[0]?.id_rol === 2) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}

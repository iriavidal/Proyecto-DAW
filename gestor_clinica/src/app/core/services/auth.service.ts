import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environment';
import { AuthResponse } from '../models/auth-response.interface';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private _router: Router
  ) {}

  login(credentials: {
    email_usuario: string;
    password_usuario: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<AuthResponse>(
        `${environment.URLServer}/usuarios?login=true`,
        JSON.stringify(credentials),
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  register(userData: {
    nombre_usuario: string;
    apellidos_usuario: string;
    email_usuario: string;
    password_usuario: string;
    dni_usuario: string;
    direccion_usuario: string;
    id_rol: number;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<AuthResponse>(
        `${environment.URLServer}/usuarios?register=true`,
        JSON.stringify(userData),
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  logout() {
    this.tokenService.clearToken();
    this._router.navigate(['/']);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error de red o error inesperado
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error de la API
      if (error.status === 404) {
        errorMessage =
          error.error?.results || 'No se encontró el recurso solicitado.';
      } else {
        errorMessage = `Código de error: ${error.status}, ${error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}

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

  /* login(credentials: { email_usuario: string; password_usuario: string }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post<AuthResponse>(
        `${environment.URLServer}/usuarios?login=true`,
        JSON.stringify(credentials),
        { headers }
      )
      .subscribe({
        next: (data) => {
          if (data.status === 200) {
            const token = data.results[0].token_usuario;
            this.tokenService.storeToken(token);
            console.log('Login exitoso. Token guardado.');
            //this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => console.error('Error en el login:', err),
      });
  } */

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
    email_usuario: string;
    password_usuario: string;
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
        // Si el error es 404, podemos manejarlo específicamente
        errorMessage =
          error.error?.results || 'No se encontró el recurso solicitado.';
      } else {
        errorMessage = `Código de error: ${error.status}, ${error.statusText}`;
      }
    }

    // Retornar el error con un mensaje claro
    return throwError(() => new Error(errorMessage));
  }
}

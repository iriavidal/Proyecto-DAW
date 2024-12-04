import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuario(userId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/usuarios?linkTo=id_usuario&equalTo=${userId}`,
      { headers }
    );
  }

  updateUsuario(
    userId: number,
    token: string,
    data: {
      nombre_usuario?: string;
      apellidos_usuario?: string;
      dni_usuario?: string;
      direccion_usuario?: string;
      email_usuario?: string;
    }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .put<any>(
        `${environment.URLServer}/usuarios?token=${token}&nameId=id_usuario&id=${userId}`,
        JSON.stringify(data),
        { headers }
      )
      .pipe(catchError(this.handleError));
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

    // Retornar el error
    return throwError(() => new Error(errorMessage));
  }
}
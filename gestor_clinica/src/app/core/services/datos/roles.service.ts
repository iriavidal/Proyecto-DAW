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
export class RolesService {
  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(`${environment.URLServer}/roles`, { headers });
  }

  updateRol(
    rolId: number,
    token: string,
    data: { rol?: string }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .put<any>(
        `${environment.URLServer}/roles?token=${token}&nameId=id_rol&id=${rolId}`,
        JSON.stringify(data),
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  postRol(
    data: {
      rol: string;
    },
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        `${environment.URLServer}/roles?token=${token}`,
        JSON.stringify(data),
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  deleteRol(rolId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .delete<any>(
        `${environment.URLServer}/roles?token=${token}&nameId=id_rol&id=${rolId}`,
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
        errorMessage =
          error.error?.results || 'No se encontró el recurso solicitado.';
      } else {
        errorMessage = `Código de error: ${error.status}, ${error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}

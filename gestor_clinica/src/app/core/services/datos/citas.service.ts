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
export class CitasService {
  constructor(private http: HttpClient) {}

  getAllCitas(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(`${environment.URLServer}/citas`, { headers });
  }

  getCitasMascota(mascotaId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/citas?linkTo=id_mascota&equalTo=${mascotaId}`,
      { headers }
    );
  }

  getCita(citaId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/citas?linkTo=id_cita&equalTo=${citaId}`,
      { headers }
    );
  }

  postCitaMascota(
    data: {
      id_mascota: number;
      tipo_cita: string;
      fecha_y_hora: string;
    },
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        `${environment.URLServer}/citas?token=${token}`,
        JSON.stringify(data),
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  deleteCita(citaId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .delete<any>(
        `${environment.URLServer}/citas?token=${token}&nameId=id_cita&id=${citaId}`,
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  updateCita(
    citaId: number,
    token: string,
    data: { tipo_cita?: string; fecha_y_hora?: string }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .put<any>(
        `${environment.URLServer}/citas?token=${token}&nameId=id_cita&id=${citaId}`,
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
        errorMessage =
          error.error?.results || 'No se encontró el recurso solicitado.';
      } else {
        errorMessage = `Código de error: ${error.status}, ${error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}

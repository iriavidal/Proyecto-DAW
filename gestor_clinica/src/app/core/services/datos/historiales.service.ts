import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HistorialesService {
  constructor(private http: HttpClient) {}

  getHistorialesMascota(mascotaId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/historiales?linkTo=id_mascota&equalTo=${mascotaId}`,
      { headers }
    );
  }

  getHistorial(historialId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/historiales?linkTo=id_historial&equalTo=${historialId}`,
      { headers }
    );
  }

  getAllHistoriales(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(`${environment.URLServer}/historiales`, {
      headers,
    });
  }

  postHistorialMascota(
    data: {
      id_mascota: number;
      id_cita: number;
      fecha_y_hora: string;
      motivo: string;
      anotaciones: string;
    },
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        `${environment.URLServer}/historiales?token=${token}`,
        JSON.stringify(data),
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  verificarHistorial(idCita: number): Observable<boolean> {
    return this.http
      .get<any>(
        `${environment.URLServer}/historiales?linkTo=id_cita&equalTo=${idCita}`
      )
      .pipe(
        map((response) => {
          return response.results && response.results.length > 0;
        })
      );
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

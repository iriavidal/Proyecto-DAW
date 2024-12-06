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
export class MascotasService {
  constructor(private http: HttpClient) {}

  getMascota(mascotaId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/mascotas?linkTo=id_mascota&equalTo=${mascotaId}`,
      { headers }
    );
  }

  getMascotasUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/mascotas?linkTo=id_usuario&equalTo=${userId}`,
      { headers }
    );
  }

  getUltimaCita(mascotaId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/citas?linkTo=id_mascota&equalTo=${mascotaId}&orderBy=fecha_y_hora&orderMode=ASC&limit=1`,
      { headers }
    );
  }

  addMascota(
    data: {
      id_usuario: number;
      id_tipo: number;
      nombre_mascota: string;
      fecha_nac_mascota: string;
      nChip_mascota: string;
      raza_mascota: string;
    },
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        `${environment.URLServer}/mascotas?token=${token}`,
        JSON.stringify(data),
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  getTiposMascota(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(`${environment.URLServer}/TiposMascota`, {
      headers,
    });
  }

  getTipoMascota(idTipo: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(
      `${environment.URLServer}/TiposMascota/?linkTo=id_tipo&equalTo=${idTipo}`,
      {
        headers,
      }
    );
  }

  updateMascota(
    mascotaId: number,
    token: string,
    data: {
      id_usuario?: number;
      id_tipo?: number;
      nombre_mascota?: string;
      fecha_nac_mascota?: string;
      nChip_mascota?: string;
      raza_mascota?: string;
    }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .put<any>(
        `${environment.URLServer}/mascotas?token=${token}&nameId=id_mascota&id=${mascotaId}`,
        JSON.stringify(data),
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  deleteMascota(mascotaId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .delete<any>(
        `${environment.URLServer}/mascotas?token=${token}&nameId=id_mascota&id=${mascotaId}`,
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

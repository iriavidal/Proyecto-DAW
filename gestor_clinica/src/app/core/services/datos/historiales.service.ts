import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';

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
}

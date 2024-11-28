import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class MascotasService {
  constructor(private http: HttpClient) {}

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
}

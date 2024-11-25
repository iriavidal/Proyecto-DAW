import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'authToken';

  constructor() {}

  storeToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  clearToken() {
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  getUserIdFromToken(): number | null {
    const decodedToken = this.decodeToken();
    return decodedToken?.data?.id || null;
  }
}

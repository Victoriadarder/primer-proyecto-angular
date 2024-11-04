import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CocherasService {
  private apiUrl = 'http://localhost:4000'; // Asegúrate de que esta sea la URL base correcta

  constructor(private auth: AuthService) {}

  getCocheras() {
    return fetch(`${this.apiUrl}/cocheras`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? ''),
      },
    }).then(r => r.json());
  }

  getReportes() {
    return fetch(`${this.apiUrl}/reportes`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? ''),
      },
    }).then(r => r.json());
  }
}

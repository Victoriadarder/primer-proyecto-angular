import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { estacionamiento } from '../interfaces/estacionamiento';

@Injectable({
  providedIn: 'root'
})
export class EstacionamientosService {
  auth = inject(AuthService);

  // Método para estacionar un auto en una cochera
  estacionarAuto(patente: string, idCochera: number): Promise<any> {
    return fetch(`http://localhost:4000/estacionamientos/${idCochera}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (this.auth.getToken() ?? ''),
      },
      body: JSON.stringify({ patente })
    }).then(response => {
      if (!response.ok) {
        throw new Error("Error al estacionar el auto");
      }
      return response.json();
    });
  }

  // Método para obtener todos los estacionamientos
  estacionamientos(): Promise<estacionamiento[]> {
    return fetch('http://localhost:4000/estacionamientos', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? ''),
      },
    }).then(r => r.json());
  }

  // Método para buscar un estacionamiento activo en una cochera específica
  buscarEstacionamientoActivo(cocheraId: number) {
    return this.estacionamientos().then(estacionamientos => {
      let buscado = null;
      for (let estacionamiento of estacionamientos) {
        if (estacionamiento.idCochera === cocheraId &&
            estacionamiento.horaEgreso === null) {
          buscado = estacionamiento;
        }
      }
      return buscado;
    });
  }
}

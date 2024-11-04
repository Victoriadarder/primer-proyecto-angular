import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cochera } from '../interfaces/cochera';
import { HeaderComponent } from '../components/header/header.component';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { EstacionamientosService } from '../services/estacionamientos.service';
import { CocherasService } from '../services/cocheras.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './estado-cocheras.component.html',
  styleUrls: ['./estado-cocheras.component.scss']
})
export class EstadoCocherasComponent {
  titulo = 'ESTADO DE COCHERAS';
  header: {nro: string, disponibilidad: string, ingreso: string, acciones: string} = {
    nro: 'Nro',
    disponibilidad: 'Disponibilidad',
    ingreso: 'Ingreso',
    acciones: 'Acciones',
  };

  filas: Cochera[] = []; // Cambiado a Cochera[]
  siguienteNumero: number = 1;
  estacionamientos = inject(EstacionamientosService);
  auth = inject(AuthService);
  cocheras = inject(CocherasService);

  ngOnInit() {
    this.traerCocheras();
  }

  traerCocheras() {
    return this.cocheras.getCocheras().then((cocheras: Cochera[]) => { // Cambiado a Cochera[]
      this.filas = [];

      for (let cochera of cocheras) { // Corregido el typo de "coheras"
        this.estacionamientos.buscarEstacionamientoActivo(cochera.id).then(estacionamiento => {
          this.filas.push({
            ...cochera,
            activo: estacionamiento,
          });
        });
      }
    });
  }

  agregarFila() {
    Swal.fire({
      title: "Ingrese la descripcion de la cochera",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Ingrese la descripcion de la cochera";
        }
        return null;
      },
    }).then(res => {
      if (res.isConfirmed) {
        fetch('http://localhost:4000/cocheras', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + (localStorage.getItem('token') ?? "")
          },
          body: JSON.stringify({ descripcion: res.value })
        }).then(() => this.traerCocheras());
      }
    });
  }

  eliminarFila(cocheraId: number, event: Event) {
    event.stopPropagation();
    fetch(`http://localhost:4000/cocheras/${cocheraId}`, { // Usar comillas invertidas
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? ''),
      },
    }).then(() => this.traerCocheras());
  }

  cambiarDisponibilidadCocheras(cocheraId: number, deshabilitada: boolean, event: Event) {
    event.stopPropagation();
    const endpoint = deshabilitada ? 'enable' : 'disable';
    fetch(`http://localhost:4000/cocheras/${cocheraId}/${endpoint}`, { // Usar comillas invertidas
      method: "POST",
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? ''),
      },
    }).then(() => this.traerCocheras());
  }

  abrirModalNuevoEstacionamiento(idCochera: number) {
    Swal.fire({
      title: "Ingrese la patente del vehiculo",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Ingrese una patente valida";
        }
        return null;
      },
    }).then(res => {
      if (res.isConfirmed) {
        this.estacionamientos.estacionarAuto(res.value, idCochera).then(() => {
          this.traerCocheras();
        });
      }
    });
  }
}

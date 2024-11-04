import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CocherasService } from '../services/cocheras.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule] // Agrega CommonModule aquí
})
export class ReportesComponent implements OnInit {
  reportes: any[] = [];

  constructor(private cocherasService: CocherasService) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes() {
    this.cocherasService.getReportes()
      .then(data => {
        this.reportes = data;
      })
      .catch(error => {
        console.error('Error al cargar los reportes', error);
      });
  }
}

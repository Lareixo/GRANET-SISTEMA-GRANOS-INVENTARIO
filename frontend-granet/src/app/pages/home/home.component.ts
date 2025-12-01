import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class Home implements OnInit {
  stats = {
    totalProveedores: 0,
    totalGranos: 0,
    stockTotal: 0,
    montoTotal: 0
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.dataService.getEstadisticas().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Error cargando estadísticas:', err);
      }
    });
  }
}

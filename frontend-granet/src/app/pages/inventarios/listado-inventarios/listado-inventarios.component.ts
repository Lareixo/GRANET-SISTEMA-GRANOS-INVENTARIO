import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data';

@Component({
  selector: 'app-listado-inventarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './listado-inventarios.component.html',
  styleUrl: './listado-inventarios.component.css',
})
export class ListadoInventarios implements OnInit {
  inventarios: any[] = [];
  stockTotal = 0;
  valorTotal = 0;
  isLoading: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.cargarInventarios();
  }

  cargarInventarios(): void {
    this.isLoading = true;
    this.dataService.getInventarios().subscribe({
      next: (data) => {
        this.inventarios = data;
        this.calcularTotales();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando inventarios:', err);
        this.isLoading = false;
      }
    });
  }

  calcularTotales(): void {
    this.stockTotal = this.inventarios.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    this.valorTotal = this.inventarios.reduce((sum, item) => sum + ((item.cantidad || 0) * (item.precio_unitario || 0)), 0);
  }
}

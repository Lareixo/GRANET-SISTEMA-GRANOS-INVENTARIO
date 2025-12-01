import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data';

@Component({
  selector: 'app-listado-proveedores',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-proveedores.component.html',
  styleUrl: './listado-proveedores.component.css',
})
export class ListadoProveedores implements OnInit {
  proveedores: any[] = [];
  isLoading: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.isLoading = true;
    this.dataService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando proveedores:', err);
        this.isLoading = false;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../services/data';

@Component({
  selector: 'app-listado-granos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listado-granos.component.html',
  styleUrls: ['./listado-granos.component.css']
})
export class ListadoGranosComponent implements OnInit {
  granos: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.obtenerGranos();
  }

  obtenerGranos() {
    this.dataService.getGranos().subscribe(
      (data) => {
        this.granos = data;
      },
      (error) => {
        console.error('Error al obtener granos:', error);
      }
    );
  }
}

// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  // PROVEEDORES
  getProveedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proveedores`);
  }

  crearProveedor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/proveedores`, data);
  }

  // GRANOS
  getGranos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/granos`); 
  }

  crearGrano(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/granos`, data);
  }

  // INVENTARIOS
  getInventarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventarios`);
  }

  crearInventario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inventarios`, data);
  }

  // ESTADÍSTICAS
  getEstadisticas(): Observable<any> {
    return new Observable(observer => {
      Promise.all([
        this.getProveedores().toPromise(),
        this.getGranos().toPromise(),
        this.getInventarios().toPromise()
      ]).then(([proveedores, granos, inventarios]: any[]) => {
        const stockTotal = (inventarios || []).reduce((sum: number, inv: any) => sum + (inv.cantidad || 0), 0);
        const montoTotal = (inventarios || []).reduce((sum: number, inv: any) => sum + ((inv.cantidad || 0) * (inv.precio_unitario || 0)), 0);
        
        observer.next({
          totalProveedores: (proveedores || []).length,
          totalGranos: (granos || []).length,
          stockTotal: stockTotal,
          montoTotal: montoTotal
        });
        observer.complete();
      }).catch(error => observer.error(error));
    });
  }
}
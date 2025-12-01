// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Importación de Componentes Standalone
import { Home } from './pages/home/home.component';
import { ListadoProveedores } from './pages/proveedores/listado-proveedores/listado-proveedores.component';
import { ListadoInventarios } from './pages/inventarios/listado-inventarios/listado-inventarios.component';
import { FormProveedor } from './pages/proveedores/form-proveedor/form-proveedor.component';
import { FormGrano } from './pages/granos/form-grano/form-grano.component';
import { ListadoGranosComponent } from './pages/granos/listado-granos/listado-granos.component';

export const routes: Routes = [
  { path: '', component: Home, title: 'GRANET | Home' },
  { path: 'proveedores', component: ListadoProveedores, title: 'Proveedores' },
  { path: 'granos', component: ListadoGranosComponent, title: 'Granos' },
  { path: 'inventario', component: ListadoInventarios, title: 'Inventario' },
  { path: 'registro-proveedor', component: FormProveedor, title: 'Registrar Proveedor' },
  { path: 'registro-grano', component: FormGrano, title: 'Registrar Grano' },
  { path: '**', redirectTo: '' }
];
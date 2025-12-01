import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data';

@Component({
  selector: 'app-form-grano',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-grano.component.html',
  styleUrl: './form-grano.component.css',
})
export class FormGrano implements OnInit {
  formulario!: FormGroup;
  proveedores: any[] = [];
  enviando = false;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarProveedores();
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      id_proveedor: ['', Validators.required]
    });
  }

  cargarProveedores(): void {
    this.dataService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
      },
      error: (err) => {
        console.error('Error cargando proveedores:', err);
      }
    });
  }

  guardarGrano(): void {
    if (this.formulario.invalid) {
      this.mensajeError = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.enviando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    this.dataService.crearGrano(this.formulario.value).subscribe({
      next: (response) => {
        this.mensajeExito = 'Grano registrado exitosamente';
        this.formulario.reset();
        this.enviando = false;
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      },
      error: (err) => {
        this.mensajeError = 'Error al guardar el grano: ' + (err.error?.message || 'Error desconocido');
        this.enviando = false;
      }
    });
  }
}

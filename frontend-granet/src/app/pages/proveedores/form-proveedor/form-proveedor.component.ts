import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data';

@Component({
  selector: 'app-form-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-proveedor.component.html',
  styleUrl: './form-proveedor.component.css',
})
export class FormProveedor implements OnInit {
  formulario!: FormGroup;
  enviando = false;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]]
    });
  }

  guardarProveedor(): void {
    if (this.formulario.invalid) {
      this.mensajeError = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.enviando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    this.dataService.crearProveedor(this.formulario.value).subscribe({
      next: (response) => {
        this.mensajeExito = 'Proveedor registrado exitosamente';
        this.formulario.reset();
        this.enviando = false;
        setTimeout(() => {
          window.location.href = '/proveedores';
        }, 1500);
      },
      error: (err) => {
        this.mensajeError = 'Error al guardar el proveedor: ' + (err.error?.message || 'Error desconocido');
        this.enviando = false;
      }
    });
  }
}

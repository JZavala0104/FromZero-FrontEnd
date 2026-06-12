import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Proyectos } from '../../../models/Proyectos';
import { Proyectosservice } from '../../../services/proyectosservice';

@Component({
  selector: 'app-proyectos-insert',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './proyectos-insert.html',
  styleUrl: './proyectos-insert.css',
})
export class ProyectosInsert implements OnInit {
  proyectosForm: FormGroup = new FormGroup({});
  proyecto: Proyectos = new Proyectos();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pS: Proyectosservice
  ) {}

  ngOnInit(): void {
    this.proyectosForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      presupuesto: ['', Validators.required],
      idEmpresa: ['', Validators.required],
    });
  }

  insertar() {
    if (this.proyectosForm.valid) {
      this.proyecto.titulo = this.proyectosForm.value.titulo;
      this.proyecto.descripcion = this.proyectosForm.value.descripcion;
      this.proyecto.estado = this.proyectosForm.value.estado;
      this.proyecto.fechaInicio = this.proyectosForm.value.fechaInicio;
      this.proyecto.fechaFin = this.proyectosForm.value.fechaFin;
      this.proyecto.presupuesto = this.proyectosForm.value.presupuesto;
      this.proyecto.idEmpresa = this.proyectosForm.value.idEmpresa;
      this.pS.insert(this.proyecto).subscribe(() => {
        this.router.navigate(['/proyectos/listar']);
      });
    }
  }
}
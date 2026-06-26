import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Proyectos } from '../../../models/Proyectos';
import { Proyectosservice } from '../../../services/proyectosservice';

@Component({
  selector: 'app-proyectos-update',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './proyectos-update.html',
  styleUrl: './proyectos-update.css',
})
export class ProyectosUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  proyecto: Proyectos = new Proyectos();
  id: number = 0;

  constructor(
    private pS: Proyectosservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.formBuilder.group({
      idProject: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      presupuesto: ['', Validators.required],
      idEmpresa: ['', Validators.required],
    });
  }

  init() {
    this.pS.listById(this.id).subscribe((data) => {
      this.form.patchValue({
        idProject: data.idProject,
        titulo: data.titulo,
        descripcion: data.descripcion,
        estado: data.estado,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        presupuesto: data.presupuesto,
        idEmpresa: data.idEmpresa,
      });
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.proyecto.idProject = this.form.value.idProject;
      this.proyecto.titulo = this.form.value.titulo;
      this.proyecto.descripcion = this.form.value.descripcion;
      this.proyecto.estado = this.form.value.estado;
      this.proyecto.fechaInicio = this.form.value.fechaInicio;
      this.proyecto.fechaFin = this.form.value.fechaFin;
      this.proyecto.presupuesto = this.form.value.presupuesto;
      this.proyecto.idEmpresa = this.form.value.idEmpresa;
      this.pS.update(this.proyecto).subscribe(() => {
        this.router.navigate(['/proyectos/listar']);
      });
    }
  }
}
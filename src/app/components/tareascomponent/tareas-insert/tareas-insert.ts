import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Tareas } from '../../../models/Tareas';
import { Tareasservice } from '../../../services/tareasservice';

@Component({
  selector: 'app-tareas-insert',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './tareas-insert.html',
  styleUrl: './tareas-insert.css',
})
export class TareasInsert implements OnInit {
  tareasForm: FormGroup = new FormGroup({});
  tarea: Tareas = new Tareas();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tS: Tareasservice
  ) {}

  ngOnInit(): void {
    this.tareasForm = this.formBuilder.group({
      idProyecto: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  insertar() {
    if (this.tareasForm.valid) {
      this.tarea.idProyecto = this.tareasForm.value.idProyecto;
      this.tarea.titulo = this.tareasForm.value.titulo;
      this.tarea.descripcion = this.tareasForm.value.descripcion;
      this.tarea.fechaLimite = this.tareasForm.value.fechaLimite;
      this.tarea.estado = this.tareasForm.value.estado;
      this.tS.insert(this.tarea).subscribe(() => {
        this.router.navigate(['/tareas/listar']);
      });
    }
  }
}
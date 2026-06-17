import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Tareas } from '../../../models/Tareas';
import { Tareasservice } from '../../../services/tareasservice';

@Component({
  selector: 'app-tareas-update',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './tareas-update.html',
  styleUrl: './tareas-update.css',
})
export class TareasUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  tarea: Tareas = new Tareas();
  id: number = 0;

  constructor(
    private tS: Tareasservice,
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
      idTarea: [''],
      idProyecto: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  init() {
    this.tS.listById(this.id).subscribe((data) => {
      this.form.patchValue({
        idTarea: data.idTarea,
        idProyecto: data.idProyecto,
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaLimite: data.fechaLimite,
        estado: data.estado,
      });
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.tarea.idTarea = this.form.value.idTarea;
      this.tarea.idProyecto = this.form.value.idProyecto;
      this.tarea.titulo = this.form.value.titulo;
      this.tarea.descripcion = this.form.value.descripcion;
      this.tarea.fechaLimite = this.form.value.fechaLimite;
      this.tarea.estado = this.form.value.estado;
      this.tS.update(this.tarea).subscribe(() => {
        this.router.navigate(['/tareas/listar']);
      });
    }
  }
}
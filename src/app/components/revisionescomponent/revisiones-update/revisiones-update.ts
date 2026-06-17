import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Revisiones } from '../../../models/Revisiones';
import { Revisionesservice } from '../../../services/revisionesservice';

@Component({
  selector: 'app-revisiones-update',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './revisiones-update.html',
  styleUrl: './revisiones-update.css',
})
export class RevisionesUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  revision: Revisiones = new Revisiones();
  id: number = 0;

  constructor(
    private rS: Revisionesservice,
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
      idRevision: [''],
      idTarea: ['', Validators.required],
      comentar: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  init() {
    this.rS.listById(this.id).subscribe((data) => {
      this.form.patchValue({
        idRevision: data.idRevision,
        idTarea: data.idTarea,
        comentar: data.comentar,
        estado: data.estado,
        fecha: data.fecha,
      });
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.revision.idRevision = this.form.value.idRevision;
      this.revision.idTarea = this.form.value.idTarea;
      this.revision.comentar = this.form.value.comentar;
      this.revision.estado = this.form.value.estado;
      this.revision.fecha = this.form.value.fecha;
      this.rS.update(this.revision).subscribe(() => {
        this.router.navigate(['/revisiones/listar']);
      });
    }
  }
}
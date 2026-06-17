import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Revisiones } from '../../../models/Revisiones';
import { Revisionesservice } from '../../../services/revisionesservice';

@Component({
  selector: 'app-revisiones-insert',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './revisiones-insert.html',
  styleUrl: './revisiones-insert.css',
})
export class RevisionesInsert implements OnInit {
  revisionesForm: FormGroup = new FormGroup({});
  revision: Revisiones = new Revisiones();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rS: Revisionesservice
  ) {}

  ngOnInit(): void {
    this.revisionesForm = this.formBuilder.group({
      idTarea: ['', Validators.required],
      comentar: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  insertar() {
    if (this.revisionesForm.valid) {
      this.revision.idTarea = this.revisionesForm.value.idTarea;
      this.revision.comentar = this.revisionesForm.value.comentar;
      this.revision.estado = this.revisionesForm.value.estado;
      this.revision.fecha = this.revisionesForm.value.fecha;
      this.rS.insert(this.revision).subscribe(() => {
        this.router.navigate(['/revisiones/listar']);
      });
    }
  }
}
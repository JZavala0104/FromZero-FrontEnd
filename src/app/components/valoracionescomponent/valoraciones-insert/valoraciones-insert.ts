import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Valoraciones } from '../../../models/Valoraciones';
import { Valoracionesservice } from '../../../services/valoracionesservice';

@Component({
  selector: 'app-valoraciones-insert',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './valoraciones-insert.html',
  styleUrl: './valoraciones-insert.css',
})
export class ValoracionesInsert implements OnInit {
  valoracionesForm: FormGroup = new FormGroup({});
  valoracion: Valoraciones = new Valoraciones();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vS: Valoracionesservice
  ) {}

  ngOnInit(): void {
    this.valoracionesForm = this.formBuilder.group({
      idProyecto: ['', Validators.required],
      puntuacion: ['', Validators.required],
      comentario: ['', Validators.required],
    });
  }

  insertar() {
    if (this.valoracionesForm.valid) {
      this.valoracion.idProyecto = this.valoracionesForm.value.idProyecto;
      this.valoracion.puntuacion = this.valoracionesForm.value.puntuacion;
      this.valoracion.comentario = this.valoracionesForm.value.comentario;
      this.vS.insert(this.valoracion).subscribe(() => {
        this.router.navigate(['/valoraciones/listar']);
      });
    }
  }
}
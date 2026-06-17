import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Valoraciones } from '../../../models/Valoraciones';
import { Valoracionesservice } from '../../../services/valoracionesservice';

@Component({
  selector: 'app-valoraciones-update',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './valoraciones-update.html',
  styleUrl: './valoraciones-update.css',
})
export class ValoracionesUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  valoracion: Valoraciones = new Valoraciones();
  id: number = 0;

  constructor(
    private vS: Valoracionesservice,
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
      idValoracion: [''],
      idProyecto: ['', Validators.required],
      puntuacion: ['', Validators.required],
      comentario: ['', Validators.required],
    });
  }

  init() {
    this.vS.listById(this.id).subscribe((data) => {
      this.form.patchValue({
        idValoracion: data.idValoracion,
        idProyecto: data.idProyecto,
        puntuacion: data.puntuacion,
        comentario: data.comentario,
      });
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.valoracion.idValoracion = this.form.value.idValoracion;
      this.valoracion.idProyecto = this.form.value.idProyecto;
      this.valoracion.puntuacion = this.form.value.puntuacion;
      this.valoracion.comentario = this.form.value.comentario;
      this.vS.update(this.valoracion).subscribe(() => {
        this.router.navigate(['/valoraciones/listar']);
      });
    }
  }
}
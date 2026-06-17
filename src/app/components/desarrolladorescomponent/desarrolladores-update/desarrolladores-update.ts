import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Desarrolladores } from '../../../models/Desarrolladores';
import { Desarrolladoresservice } from '../../../services/desarrolladoresservice';

@Component({
  selector: 'app-desarrolladores-update',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './desarrolladores-update.html',
  styleUrl: './desarrolladores-update.css',
})
export class DesarrolladoresUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  desarrollador: Desarrolladores = new Desarrolladores();
  id: number = 0;

  constructor(
    private dS: Desarrolladoresservice,
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
      idDesarrollador: [''],
      idUser: ['', Validators.required],
      habilidades: ['', Validators.required],
      experiencia: ['', Validators.required],
      portafolio: ['', Validators.required],
    });
  }

  init() {
    this.dS.listById(this.id).subscribe((data) => {
      this.form.patchValue({
        idDesarrollador: data.idDesarrollador,
        idUser: data.idUser,
        habilidades: data.habilidades,
        experiencia: data.experiencia,
        portafolio: data.portafolio,
      });
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.desarrollador.idDesarrollador = this.form.value.idDesarrollador;
      this.desarrollador.idUser = this.form.value.idUser;
      this.desarrollador.habilidades = this.form.value.habilidades;
      this.desarrollador.experiencia = this.form.value.experiencia;
      this.desarrollador.portafolio = this.form.value.portafolio;
      this.dS.update(this.desarrollador).subscribe(() => {
        this.router.navigate(['/desarrolladores/listar']);
      });
    }
  }
}
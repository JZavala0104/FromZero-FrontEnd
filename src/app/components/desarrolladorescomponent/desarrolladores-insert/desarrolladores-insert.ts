import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Desarrolladores } from '../../../models/Desarrolladores';
import { Desarrolladoresservice } from '../../../services/desarrolladoresservice';

@Component({
  selector: 'app-desarrolladores-insert',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './desarrolladores-insert.html',
  styleUrl: './desarrolladores-insert.css',
})
export class DesarrolladoresInsert implements OnInit {
  desarrolladoresForm: FormGroup = new FormGroup({});
  desarrollador: Desarrolladores = new Desarrolladores();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dS: Desarrolladoresservice
  ) {}

  ngOnInit(): void {
    this.desarrolladoresForm = this.formBuilder.group({
      idUser: ['', Validators.required],
      habilidades: ['', Validators.required],
      experiencia: ['', Validators.required],
      portafolio: ['', Validators.required],
    });
  }

  insertar() {
    if (this.desarrolladoresForm.valid) {
      this.desarrollador.idUser = this.desarrolladoresForm.value.idUser;
      this.desarrollador.habilidades = this.desarrolladoresForm.value.habilidades;
      this.desarrollador.experiencia = this.desarrolladoresForm.value.experiencia;
      this.desarrollador.portafolio = this.desarrolladoresForm.value.portafolio;
      this.dS.insert(this.desarrollador).subscribe(() => {
        this.router.navigate(['/desarrolladores/listar']);
      });
    }
  }
}
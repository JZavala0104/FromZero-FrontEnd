import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Empresas } from '../../../models/Empresas';
import { Empresasservice } from '../../../services/empresasservice';

@Component({
  selector: 'app-empresas-insert',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './empresas-insert.html',
  styleUrl: './empresas-insert.css',
})
export class EmpresasInsert implements OnInit {
  empresasForm: FormGroup = new FormGroup({});
  empresa: Empresas = new Empresas();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eS: Empresasservice
  ) {}

  ngOnInit(): void {
    this.empresasForm = this.formBuilder.group({
      nombreEmpresa: ['', Validators.required],
      descripcion: ['', Validators.required],
      idUser: ['', Validators.required],
    });
  }

  insertar() {
    if (this.empresasForm.valid) {
      this.empresa.nombreEmpresa = this.empresasForm.value.nombreEmpresa;
      this.empresa.descripcion = this.empresasForm.value.descripcion;
      this.empresa.idUser = this.empresasForm.value.idUser;
      this.eS.insert(this.empresa).subscribe(() => {
        this.router.navigate(['/empresas/listar']);
      });
    }
  }
}
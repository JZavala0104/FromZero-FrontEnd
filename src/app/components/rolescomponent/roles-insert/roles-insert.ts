import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; 
import { Router } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { Rolesservice } from '../../../services/rolesservice';

@Component({
  selector: 'app-roles-insert',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule], 
  providers: [provideNativeDateAdapter()],
  templateUrl: './roles-insert.html',
  styleUrl: './roles-insert.css',
})
export class RolesInsert implements OnInit {
  rolesForm: FormGroup = new FormGroup({});
  role: Roles = new Roles();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private rS: Rolesservice
  ) {}

  ngOnInit(): void {
    this.rolesForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }
  insertar(){
    if(this.rolesForm.valid){
      this.role.Nombre = this.rolesForm.value.nombre;
      this.rS.insert(this.role).subscribe((data) => {
        this.router.navigate(['/roles/listar']);
      });
    }
  }
}

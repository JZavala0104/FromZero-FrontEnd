import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { Rolesservice } from '../../../services/rolesservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roles-update',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  providers: [provideNativeDateAdapter()],
  templateUrl: './roles-update.html',
  styleUrl: './roles-update.css',
})
export class RolesUpdate implements OnInit {
  rolesForm: FormGroup = new FormGroup({});
  role: Roles = new Roles();
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rS: Rolesservice,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.rolesForm = this.formBuilder.group({
      IdRol: [''],
      nombre: ['', Validators.required],
    });
  }
  actualizar() {
    if (this.rolesForm.valid) {
      this.role.idRol = this.rolesForm.value.IdRol;
      this.role.nombre = this.rolesForm.value.nombre.toUpperCase();
      this.rS.update(this.role).subscribe({
        next: () => {
          this.router.navigate(['/roles/listar']);
        },
      });
    }
  }
  init() {
    this.rS.listById(this.id).subscribe((data) => {
      this.rolesForm.patchValue({
        IdRol: data.idRol,
        nombre: data.nombre,
      });
    });
  }
}

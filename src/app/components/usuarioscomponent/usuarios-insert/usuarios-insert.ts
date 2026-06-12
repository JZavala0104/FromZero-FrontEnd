import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { Usuariosservice } from '../../../services/usuariosservice';
import { Usuarios } from '../../../models/Usuarios';
import { MatSelectModule } from '@angular/material/select';
import { Rolesservice } from '../../../services/rolesservice';
import { Roles } from '../../../models/Roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-insert',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './usuarios-insert.html',
  styleUrl: './usuarios-insert.css',
})
export class UsuariosInsert implements OnInit {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  userForm: FormGroup = new FormGroup({});
  user: Usuarios = new Usuarios();
  listaRoles: Roles[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private uS: Usuariosservice,
    private rS: Rolesservice,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.rS.list().subscribe({
      next: (data) => {
        this.listaRoles = data;
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
      },
    });
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
      habilitado: [false, Validators.required],
      idRol: [0, Validators.required],
    });
  }
  insertar() {
    if (this.userForm.valid) {
      this.user.Username = this.userForm.value.username;
      this.user.nombre = this.userForm.value.nombre;
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      this.user.fechaRegistro = this.userForm.value.fechaRegistro;
      this.user.Habilitado = this.userForm.value.habilitado;
      this.user.idRol = this.userForm.value.idRol;
      this.uS.insert(this.user).subscribe({
        next: (data) => {
          this.router.navigate(['/usuarios/listar']);
        },
      });
    }
  }
}

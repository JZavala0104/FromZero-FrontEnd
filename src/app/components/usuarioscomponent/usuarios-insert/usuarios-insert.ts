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
import { Router } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-usuarios-insert',
  standalone: true,
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
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES',
    },
  ],
  templateUrl: './usuarios-insert.html',
  styleUrl: './usuarios-insert.css',
})
export class UsuariosInsert implements OnInit {
  hide = signal(true);

  // Variables de clase
  userForm: FormGroup;
  user: Usuarios = new Usuarios();
  listaRoles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private uS: Usuariosservice,
    private rS: Rolesservice,
    private router: Router,
  ) {
    // 1. SOLUCIÓN NG0100: Inicializamos el formulario inmediatamente
    // para que la vista HTML ya tenga la estructura antes de dibujar
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
      habilitado: [true, Validators.required], // Mejor usar true o false en lugar de vacío
      idRol: [null, Validators.required], // null es ideal para selects sin elegir
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.rS.list().subscribe({
      next: (data) => {
        this.listaRoles = data;
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
      },
    });
  }

  insertar() {
    if (this.userForm.valid) {
      this.user.username = this.userForm.value.username.toUpperCase();
      this.user.nombre = this.userForm.value.nombre.toUpperCase();
      this.user.email = this.userForm.value.email.toUpperCase();
      this.user.password = this.userForm.value.password;
      this.user.fechaRegistro = this.userForm.value.fechaRegistro;
      this.user.habilitado = this.userForm.value.habilitado;
      this.user.idRol = this.userForm.value.idRol;

      this.uS.insert(this.user).subscribe({
        next: (data) => {
          this.router.navigate(['/usuarios/listar']);
        },
      });
    }
  }
}

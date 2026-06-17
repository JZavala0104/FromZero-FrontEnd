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
import { ActivatedRoute, Params } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-update',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './usuarios-update.html',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES',
    },
  ],
  styleUrl: './usuarios-update.css',
})
export class UsuariosUpdate implements OnInit {
  //Variables del Update
  userForm: FormGroup = new FormGroup({});
  user: Usuarios = new Usuarios();
  id: number = 0;
  //Variables del Insert
  hide = signal(true);
  listaRoles: any[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private uS: Usuariosservice,
    private rS: Rolesservice,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit(): void {
    //UPDATE
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.userForm = this.formBuilder.group({
      idUser: [''],
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
      habilitado: [true, Validators.required],
      idRol: [null, Validators.required],
    });
    //INSERT
    this.rS.list().subscribe({
      next: (data) => {
        this.listaRoles = data;
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
      },
    });
  }

  actualizar() {
    if (this.userForm.valid) {
      this.user.idUser = this.userForm.value.idUser;
      this.user.username = this.userForm.value.username.toUpperCase();
      this.user.nombre = this.userForm.value.nombre.toUpperCase();
      this.user.email = this.userForm.value.email.toUpperCase();
      this.user.password = this.userForm.value.password;
      this.user.fechaRegistro = this.userForm.value.fechaRegistro;
      this.user.habilitado = this.userForm.value.habilitado;
      this.user.idRol = this.userForm.value.idRol;

      this.uS.update(this.user).subscribe({
        next: () => {
          this.router.navigate(['/usuarios/listar']);
        },
      });
    }
  }
  init() {
    this.uS.listById(this.id).subscribe((data) => {
      this.userForm.patchValue({
        idUser: data.idUser,
        username: data.username,
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        fechaRegistro: data.fechaRegistro,
        habilitado: data.habilitado,
        idRol: data.idRol,
      });
    });
  }
}

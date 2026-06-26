import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Notificaciones } from '../../../models/Notificaciones';
import { Notificacionesservice } from '../../../services/notificacionesservice';
import { Usuarios } from '../../../models/Usuarios';
import { Usuariosservice } from '../../../services/usuariosservice';

import { finalize } from 'rxjs';

@Component({
  selector: 'app-notificaciones-insert',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, RouterLink],
  templateUrl: './notificaciones-insert.html',
  styleUrl: './notificaciones-insert.css',
})
export class NotificacionesInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  usuarios: Usuarios[] = [];
  cargandoUsuarios: boolean = false;

  constructor(
    private fb: FormBuilder,
    private nS: Notificacionesservice,
    private uS: Usuariosservice,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idUser: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(3)]],
      leido: [false],
      fecha: [this.formatDatetimeLocal(new Date()), Validators.required],
    });

    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargandoUsuarios = true;

    this.uS
      .list()
      .pipe(
        finalize(() => {
          this.cargandoUsuarios = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Usuarios cargados:', data);
          this.usuarios = data;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error cargando usuarios:', err);
          this.usuarios = [];
          this.cd.detectChanges();
        },
      });
  }

  formatDatetimeLocal(d: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const notif = new Notificaciones();
    notif.idUser = Number(this.form.value.idUser);
    notif.mensaje = this.form.value.mensaje;
    notif.leido = this.form.value.leido;
    notif.fecha = new Date(this.form.value.fecha);

    this.nS.insert(notif).subscribe({
      next: () => {
        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
          this.router.navigate(['/notificaciones/listar']);
        });
      },
      error: (err) => {
        console.error('Error guardando notificación', err);
      },
    });
  }
}
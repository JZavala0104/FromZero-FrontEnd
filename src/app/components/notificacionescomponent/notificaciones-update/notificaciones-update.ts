import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Notificaciones } from '../../../models/Notificaciones';
import { Notificacionesservice } from '../../../services/notificacionesservice';
import { Usuarios } from '../../../models/Usuarios';
import { Usuariosservice } from '../../../services/usuariosservice';

import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-notificaciones-update',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, RouterLink],
  templateUrl: './notificaciones-update.html',
  styleUrl: './notificaciones-update.css',
})
export class NotificacionesUpdate implements OnInit {
  form: FormGroup;
  usuarios: Usuarios[] = [];
  cargando = true;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private nS: Notificacionesservice,
    private uS: Usuariosservice,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      idUser: [null, Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(3)]],
      leido: [false],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);

    this.uS.list().pipe(catchError(() => of([]))).subscribe({
      next: (data) => { this.usuarios = data; },
    });

    this.nS.listById(this.id).subscribe({
      next: (data: any) => {
        const fechaStr = data.fecha ? this.toDatetimeLocal(new Date(data.fecha)) : '';
        this.form.patchValue({
          idUser: data.idUser,
          mensaje: data.mensaje,
          leido: data.leido,
          fecha: fechaStr,
        });
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar notificación', err);
        this.cargando = false;
      }
    });
  }

  toDatetimeLocal(d: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const notif = new Notificaciones();
    notif.idNotificacion = this.id;
    notif.idUser = +this.form.value.idUser;
    notif.mensaje = this.form.value.mensaje;
    notif.leido = this.form.value.leido;
    notif.fecha = new Date(this.form.value.fecha);
    this.nS.update(notif).subscribe({
      next: () => this.router.navigate(['/notificaciones/listar']),
      error: (err: any) => console.error('Error actualizando notificación', err),
    });
  }
}

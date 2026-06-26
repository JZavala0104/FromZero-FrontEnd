import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription, finalize } from 'rxjs';

import { Mensajes } from '../../../models/Mensajes';
import { Proyectos } from '../../../models/Proyectos';
import { Usuarios } from '../../../models/Usuarios';
import { Mensajesservice } from '../../../services/mensajesservice';
import { Proyectosservice } from '../../../services/proyectosservice';
import { Usuariosservice } from '../../../services/usuariosservice';

@Component({
  selector: 'app-mensajes-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  templateUrl: './mensajes-chat.html',
  styleUrl: './mensajes-chat.css'
})
export class MensajesChat implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('messagesEnd') private messagesEnd!: ElementRef<HTMLDivElement>;

  chatForm!: FormGroup;

  idProyecto: number = 0;
  proyecto: Proyectos | null = null;
  mensajes: Mensajes[] = [];
  usuarios: Usuarios[] = [];

  usuarioSeleccionadoId: number | null = null;

  loading: boolean = false;
  cargandoUsuarios: boolean = false;
  cargandoProyecto: boolean = false;

  private shouldScrollToBottom: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mensajesService: Mensajesservice,
    private proyectosService: Proyectosservice,
    private usuariosService: Usuariosservice,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToUserChange();

    const paramId = this.route.snapshot.paramMap.get('idProyecto');
    this.idProyecto = paramId ? Number(paramId) : 0;

    this.cargarProyecto();
    this.cargarUsuarios();
    this.cargarMensajes();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initForm(): void {
    this.chatForm = this.fb.group({
      usuarioId: [null, Validators.required],
      contenido: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  private subscribeToUserChange(): void {
    const sub = this.chatForm.get('usuarioId')!.valueChanges.subscribe(id => {
      this.usuarioSeleccionadoId = Number(id);
      this.cd.detectChanges();
    });

    this.subscriptions.add(sub);
  }

  cargarProyecto(): void {
    if (!this.idProyecto) return;

    this.cargandoProyecto = true;

    const sub = this.proyectosService
      .listById(this.idProyecto)
      .pipe(
        finalize(() => {
          this.cargandoProyecto = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data: Proyectos) => {
          console.log('Proyecto cargado:', data);
          this.proyecto = data;
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.error('Error al cargar el proyecto:', err);
          this.proyecto = null;
          this.cd.detectChanges();
        }
      });

    this.subscriptions.add(sub);
  }

  cargarUsuarios(): void {
    this.cargandoUsuarios = true;

    const sub = this.usuariosService
      .list()
      .pipe(
        finalize(() => {
          this.cargandoUsuarios = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data: Usuarios[]) => {
          console.log('Usuarios cargados:', data);
          this.usuarios = data;
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.error('Error al cargar usuarios:', err);
          this.usuarios = [];
          this.cd.detectChanges();
        }
      });

    this.subscriptions.add(sub);
  }

  cargarMensajes(): void {
    if (!this.idProyecto) return;

    this.loading = true;

    const sub = this.mensajesService
      .listByProyecto(this.idProyecto)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.shouldScrollToBottom = true;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data: any) => {
          console.log('Mensajes cargados:', data);

          if (Array.isArray(data)) {
            this.mensajes = data;
          } else {
            this.mensajes = [];
          }

          this.cd.detectChanges();
        },
        error: (err: any) => {
          if (err?.status === 404) {
            this.mensajes = [];
          } else {
            console.error('Error al cargar mensajes:', err);
            this.mensajes = [];
          }

          this.cd.detectChanges();
        }
      });

    this.subscriptions.add(sub);
  }

  enviarMensaje(): void {
    if (this.chatForm.invalid) {
      this.chatForm.markAllAsTouched();
      return;
    }

    const nuevoMensaje: Mensajes = {
      idMensaje: 0,
      idProyecto: this.idProyecto,
      idUser: Number(this.chatForm.value.usuarioId),
      mensaje: this.chatForm.value.contenido.trim(),
      fecha: new Date()
    };

    const sub = this.mensajesService.insert(nuevoMensaje).subscribe({
      next: () => {
        this.chatForm.get('contenido')!.reset('');
        this.cargarMensajes();
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error al enviar mensaje:', err);
      }
    });

    this.subscriptions.add(sub);
  }

  eliminarMensaje(id: number): void {
    const confirmado = confirm('¿Eliminar este mensaje?');
    if (!confirmado) return;

    const sub = this.mensajesService.delete(id).subscribe({
      next: () => {
        this.cargarMensajes();
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error al eliminar mensaje:', err);
      }
    });

    this.subscriptions.add(sub);
  }

  volver(): void {
    this.router.navigate(['/mensajes/listar']);
  }

  esMiMensaje(msg: Mensajes): boolean {
    return this.usuarioSeleccionadoId !== null &&
      Number(msg.idUser) === Number(this.usuarioSeleccionadoId);
  }

  getNombreUsuario(idUser: number): string {
    const usuario = this.usuarios.find(u => Number(u.idUser) === Number(idUser));
    return usuario ? usuario.nombre : 'Desconocido';
  }

  formatearFecha(fecha: Date | string): string {
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return '';

    const dd = String(d.getDate()).padStart(2, '0');
    const MM = String(d.getMonth() + 1).padStart(2, '0');
    const HH = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');

    return `${dd}/${MM} ${HH}:${mm}`;
  }

  private scrollToBottom(): void {
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }
}
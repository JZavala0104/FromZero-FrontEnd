import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CommonModule,
  DecimalPipe,
  DatePipe,
  SlicePipe,
  NgClass,
} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Proyectos } from '../../../models/Proyectos';
import { Proyectosservice } from '../../../services/proyectosservice';

@Component({
  selector: 'app-mensajes-list',
  imports: [
    CommonModule,
    MatIconModule,
    DecimalPipe,
    DatePipe,
    SlicePipe,
    NgClass,
  ],
  templateUrl: './mensajes-list.html',
  styleUrl: './mensajes-list.css',
})
export class MensajesList implements OnInit {
  proyectos: Proyectos[] = [];
  cargandoProyectos: boolean = false;

  constructor(
    private proyectosService: Proyectosservice,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.cargandoProyectos = true;

    this.proyectosService
      .list()
      .pipe(
        finalize(() => {
          this.cargandoProyectos = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Proyectos cargados:', data);
          this.proyectos = data;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error cargando proyectos:', err);
          this.proyectos = [];
          this.cd.detectChanges();
        },
      });
  }

  abrirChat(idProyecto: number): void {
    this.router.navigate(['/mensajes/chat', idProyecto]);
  }
}
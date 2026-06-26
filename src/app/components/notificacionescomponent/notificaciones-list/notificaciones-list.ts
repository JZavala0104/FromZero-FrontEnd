import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  SlicePipe,
  NgClass
} from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { Notificaciones } from '../../../models/Notificaciones';
import { Notificacionesservice } from '../../../services/notificacionesservice';

@Component({
  selector: 'app-notificaciones-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
    SlicePipe,
    NgClass
  ],
  templateUrl: './notificaciones-list.html',
  styleUrl: './notificaciones-list.css',
})
export class NotificacionesList implements OnInit {
  dataSource: MatTableDataSource<Notificaciones> =
    new MatTableDataSource<Notificaciones>();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  cargandoNotificaciones: boolean = false;

  constructor(
    private nS: Notificacionesservice,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();

    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.cd.detectChanges();
    });
  }

  listar(): void {
    this.cargandoNotificaciones = true;

    this.nS
      .list()
      .pipe(
        finalize(() => {
          this.cargandoNotificaciones = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Notificaciones cargadas:', data);
          this.dataSource = new MatTableDataSource(data);
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error cargando notificaciones:', err);
          this.dataSource = new MatTableDataSource<Notificaciones>();
          this.cd.detectChanges();
        },
      });
  }

  deleteNotificacion(id: number): void {
    if (confirm('¿Eliminar esta notificación?')) {
      this.nS.delete(id).subscribe({
        next: () => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        },
        error: (err) => {
          console.error('Error eliminando notificación:', err);
        },
      });
    }
  }

  get totalNotificaciones(): number {
    return this.dataSource.data.length;
  }

  get totalLeidas(): number {
    return this.dataSource.data.filter((x) => x.leido).length;
  }

  get totalNoLeidas(): number {
    return this.dataSource.data.filter((x) => !x.leido).length;
  }
}
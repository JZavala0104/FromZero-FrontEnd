import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { forkJoin, catchError, of, finalize } from 'rxjs';

import { ProyectoDesarrollador } from '../../../models/ProyectoDesarrollador';
import { Proyectodesarrolladorservice } from '../../../services/proyectodesarrolladorservice';

import { Proyectos } from '../../../models/Proyectos';
import { Proyectosservice } from '../../../services/proyectosservice';

import { Desarrolladores } from '../../../models/Desarrolladores';
import { Desarrolladoresservice } from '../../../services/desarrolladoresservice';

import { Usuarios } from '../../../models/Usuarios';
import { Usuariosservice } from '../../../services/usuariosservice';

@Component({
  selector: 'app-proyectodesarrollador-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './proyectodesarrollador-list.html',
  styleUrl: './proyectodesarrollador-list.css',
})
export class ProyectodesarrolladorList implements OnInit {
  dataSource: MatTableDataSource<ProyectoDesarrollador> =
    new MatTableDataSource<ProyectoDesarrollador>();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  proyectos: Proyectos[] = [];
  desarrolladores: Desarrolladores[] = [];
  usuarios: Usuarios[] = [];

  cargandoAsignaciones: boolean = false;

  constructor(
    private pdS: Proyectodesarrolladorservice,
    private proyectosService: Proyectosservice,
    private desarrolladoresService: Desarrolladoresservice,
    private usuariosService: Usuariosservice,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTodo();

    this.pdS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.cd.detectChanges();
    });
  }

  cargarTodo(): void {
    this.cargandoAsignaciones = true;

    forkJoin({
      asignaciones: this.pdS.list().pipe(
        catchError((err) => {
          console.error('Error cargando asignaciones:', err);
          return of([]);
        })
      ),
      proyectos: this.proyectosService.list().pipe(
        catchError((err) => {
          console.error('Error cargando proyectos:', err);
          return of([]);
        })
      ),
      desarrolladores: this.desarrolladoresService.list().pipe(
        catchError((err) => {
          console.error('Error cargando desarrolladores:', err);
          return of([]);
        })
      ),
      usuarios: this.usuariosService.list().pipe(
        catchError((err) => {
          console.error('Error cargando usuarios:', err);
          return of([]);
        })
      ),
    })
      .pipe(
        finalize(() => {
          this.cargandoAsignaciones = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Data proyectos-desarrolladores:', res);

          this.dataSource = new MatTableDataSource(
            res.asignaciones as ProyectoDesarrollador[]
          );

          this.proyectos = res.proyectos as Proyectos[];
          this.desarrolladores = res.desarrolladores as Desarrolladores[];
          this.usuarios = res.usuarios as Usuarios[];

          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error cargando información:', err);

          this.dataSource = new MatTableDataSource<ProyectoDesarrollador>();
          this.proyectos = [];
          this.desarrolladores = [];
          this.usuarios = [];

          this.cd.detectChanges();
        },
      });
  }

  deleteAsignacion(id: number): void {
    if (confirm('¿Eliminar esta asignación?')) {
      this.pdS.delete(id).subscribe({
        next: () => {
          this.pdS.list().subscribe((data) => {
            this.pdS.setList(data);
          });
        },
        error: (err) => {
          console.error('Error eliminando asignación:', err);
        },
      });
    }
  }

  getNombreProyecto(idProyecto: number): string {
    const p = this.proyectos.find(
      (x) => Number(x.idProject) === Number(idProyecto)
    );

    return p ? p.titulo : `Proyecto ID: ${idProyecto}`;
  }

  getNombreDesarrollador(idDesarrollador: number): string {
    const d = this.desarrolladores.find(
      (x) => Number(x.idDesarrollador) === Number(idDesarrollador)
    );

    if (!d) {
      return `Desarrollador ID: ${idDesarrollador}`;
    }

    const u = this.usuarios.find(
      (x) => Number(x.idUser) === Number(d.idUser)
    );

    return u ? `${u.nombre} (@${u.username})` : `Desarrollador ID: ${idDesarrollador}`;
  }

  get totalAsignaciones(): number {
    return this.dataSource.data.length;
  }

  get totalProyectosAsignados(): number {
    const ids = this.dataSource.data.map((x) => x.idProyecto);
    return new Set(ids).size;
  }

  get totalDesarrolladoresAsignados(): number {
    const ids = this.dataSource.data.map((x) => x.idDesarrollador);
    return new Set(ids).size;
  }
}
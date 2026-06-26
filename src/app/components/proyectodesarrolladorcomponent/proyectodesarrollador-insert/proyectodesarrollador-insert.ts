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
  selector: 'app-proyectodesarrollador-insert',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, RouterLink],
  templateUrl: './proyectodesarrollador-insert.html',
  styleUrl: './proyectodesarrollador-insert.css',
})
export class ProyectodesarrolladorInsert implements OnInit {
  form: FormGroup = new FormGroup({});

  proyectos: Proyectos[] = [];
  desarrolladores: Desarrolladores[] = [];
  usuarios: Usuarios[] = [];

  cargandoCatalogos: boolean = false;

  constructor(
    private fb: FormBuilder,
    private pdS: Proyectodesarrolladorservice,
    private proyectosService: Proyectosservice,
    private desarrolladoresService: Desarrolladoresservice,
    private usuariosService: Usuariosservice,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idProyecto: ['', Validators.required],
      idDesarrollador: ['', Validators.required],
    });

    this.cargarCatalogos();
  }

  cargarCatalogos(): void {
    this.cargandoCatalogos = true;

    forkJoin({
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
          this.cargandoCatalogos = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Catálogos cargados:', res);

          this.proyectos = res.proyectos as Proyectos[];
          this.desarrolladores = res.desarrolladores as Desarrolladores[];
          this.usuarios = res.usuarios as Usuarios[];

          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error cargando catálogos:', err);

          this.proyectos = [];
          this.desarrolladores = [];
          this.usuarios = [];

          this.cd.detectChanges();
        },
      });
  }

  getNombreDesarrollador(d: Desarrolladores): string {
    const u = this.usuarios.find((x) => x.idUser === d.idUser);

    return u
      ? `${u.nombre} (@${u.username})`
      : `Desarrollador ID: ${d.idDesarrollador}`;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const pd = new ProyectoDesarrollador();
    pd.idProyecto = Number(this.form.value.idProyecto);
    pd.idDesarrollador = Number(this.form.value.idDesarrollador);

    this.pdS.insert(pd).subscribe({
      next: () => {
        this.pdS.list().subscribe((data) => {
          this.pdS.setList(data);
          this.router.navigate(['/proyectodesarrolladores/listar']);
        });
      },
      error: (err) => {
        console.error('Error guardando asignación:', err);
      },
    });
  }
}
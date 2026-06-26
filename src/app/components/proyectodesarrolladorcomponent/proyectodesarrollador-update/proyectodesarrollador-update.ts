import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin, catchError, of } from 'rxjs';

import { ProyectoDesarrollador } from '../../../models/ProyectoDesarrollador';
import { Proyectodesarrolladorservice } from '../../../services/proyectodesarrolladorservice';
import { Proyectos } from '../../../models/Proyectos';
import { Proyectosservice } from '../../../services/proyectosservice';
import { Desarrolladores } from '../../../models/Desarrolladores';
import { Desarrolladoresservice } from '../../../services/desarrolladoresservice';
import { Usuarios } from '../../../models/Usuarios';
import { Usuariosservice } from '../../../services/usuariosservice';

@Component({
  selector: 'app-proyectodesarrollador-update',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, RouterLink],
  templateUrl: './proyectodesarrollador-update.html',
  styleUrl: './proyectodesarrollador-update.css',
})
export class ProyectodesarrolladorUpdate implements OnInit {
  form: FormGroup;
  proyectos: Proyectos[] = [];
  desarrolladores: Desarrolladores[] = [];
  usuarios: Usuarios[] = [];
  cargando = true;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private pdS: Proyectodesarrolladorservice,
    private proyectosService: Proyectosservice,
    private desarrolladoresService: Desarrolladoresservice,
    private usuariosService: Usuariosservice,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      idProyecto: [null, Validators.required],
      idDesarrollador: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);

    forkJoin({
      proyectos: this.proyectosService.list().pipe(catchError(() => of([]))),
      desarrolladores: this.desarrolladoresService.list().pipe(catchError(() => of([]))),
      usuarios: this.usuariosService.list().pipe(catchError(() => of([]))),
      existente: this.pdS.listById(this.id)
    }).subscribe({
      next: (res) => {
        this.proyectos = res.proyectos;
        this.desarrolladores = res.desarrolladores;
        this.usuarios = res.usuarios;

        this.form.patchValue({
          idProyecto: res.existente.idProyecto,
          idDesarrollador: res.existente.idDesarrollador,
        });
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando datos para edición', err);
        this.cargando = false;
      }
    });
  }

  getNombreDesarrollador(d: Desarrolladores): string {
    const u = this.usuarios.find(x => x.idUser === d.idUser);
    return u ? `${u.nombre} (@${u.username})` : `Desarrollador ID: ${d.idDesarrollador}`;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const pd = new ProyectoDesarrollador();
    pd.idProyDesar = this.id;
    pd.idProyecto = +this.form.value.idProyecto;
    pd.idDesarrollador = +this.form.value.idDesarrollador;

    this.pdS.update(pd).subscribe({
      next: () => this.router.navigate(['/proyectodesarrolladores/listar']),
      error: (err) => console.error('Error actualizando asignación', err),
    });
  }
}

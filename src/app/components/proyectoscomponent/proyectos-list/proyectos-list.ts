import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Proyectos } from '../../../models/Proyectos';
import { Proyectosservice } from '../../../services/proyectosservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proyectos-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './proyectos-list.html',
  styleUrl: './proyectos-list.css',
})
export class ProyectosList implements OnInit {
  dataSource: MatTableDataSource<Proyectos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  constructor(private pS: Proyectosservice) {}

  ngOnInit(): void {
    this.listProyectos();
  }

  listProyectos() {
    this.pS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  deleteProyectos(id: number) {
    this.pS.delete(id).subscribe(() => {
      this.pS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Valoraciones } from '../../../models/Valoraciones';
import { Valoracionesservice } from '../../../services/valoracionesservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-valoraciones-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './valoraciones-list.html',
  styleUrl: './valoraciones-list.css',
})
export class ValoracionesList implements OnInit {
  dataSource: MatTableDataSource<Valoraciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private vS: Valoracionesservice) {}

  ngOnInit(): void {
    this.listValoraciones();
  }

  listValoraciones() {
    this.vS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  deleteValoraciones(id: number) {
    this.vS.delete(id).subscribe(() => {
      this.vS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
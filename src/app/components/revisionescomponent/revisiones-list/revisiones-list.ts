import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Revisiones } from '../../../models/Revisiones';
import { Revisionesservice } from '../../../services/revisionesservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-revisiones-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './revisiones-list.html',
  styleUrl: './revisiones-list.css',
})
export class RevisionesList implements OnInit {
  dataSource: MatTableDataSource<Revisiones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private rS: Revisionesservice) {}

  ngOnInit(): void {
    this.listRevisiones();
  }

  listRevisiones() {
    this.rS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  deleteRevisiones(id: number) {
    this.rS.delete(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
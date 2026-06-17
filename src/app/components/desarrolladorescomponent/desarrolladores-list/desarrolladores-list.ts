import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Desarrolladores } from '../../../models/Desarrolladores';
import { Desarrolladoresservice } from '../../../services/desarrolladoresservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-desarrolladores-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './desarrolladores-list.html',
  styleUrl: './desarrolladores-list.css',
})
export class DesarrolladoresList implements OnInit {
  dataSource: MatTableDataSource<Desarrolladores> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private dS: Desarrolladoresservice) {}

  ngOnInit(): void {
    this.listDesarrolladores();
  }

  listDesarrolladores() {
    this.dS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  deleteDesarrolladores(id: number) {
    this.dS.delete(id).subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
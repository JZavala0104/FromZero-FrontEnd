import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Tareas } from '../../../models/Tareas';
import { Tareasservice } from '../../../services/tareasservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tareas-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './tareas-list.html',
  styleUrl: './tareas-list.css',
})
export class TareasList implements OnInit {
  dataSource: MatTableDataSource<Tareas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private tS: Tareasservice) {}

  ngOnInit(): void {
    this.listTareas();
  }

  listTareas() {
    this.tS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  deleteTareas(id: number) {
    this.tS.delete(id).subscribe(() => {
      this.tS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
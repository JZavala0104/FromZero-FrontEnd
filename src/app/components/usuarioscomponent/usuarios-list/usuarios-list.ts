import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuarios } from '../../../models/Usuarios';
import { Usuariosservice } from '../../../services/usuariosservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.css',
})
export class UsuariosList implements OnInit {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','c8'];
  constructor(private uS: Usuariosservice) {}

  ngOnInit(): void {
    this.listUsuarios();
  }

  listUsuarios() {
    this.uS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Empresas } from '../../../models/Empresas';
import { Empresasservice } from '../../../services/empresasservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empresas-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './empresas-list.html',
  styleUrl: './empresas-list.css',
})
export class EmpresasList implements OnInit {
  dataSource: MatTableDataSource<Empresas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private eS: Empresasservice) {}

  ngOnInit(): void {
    this.listEmpresas();
  }

  listEmpresas() {
    this.eS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  deleteEmpresas(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.eS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
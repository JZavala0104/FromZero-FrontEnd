import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Roles } from '../../../models/Roles';
import { Rolesservice } from '../../../services/rolesservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roles-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.css',
})
export class RolesList implements OnInit {
  dataSource: MatTableDataSource<Roles> =  new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4'];
  
  constructor(private rS: Rolesservice) {}

  ngOnInit(): void {
    this.listRoles();
  }

  listRoles() {
    this.rS.list().subscribe({ 
      next: (data) => {
        this.dataSource.data = data;
      },
    }); 
  }
  listByIdRoles(){

  }
  editRoles(){

  }
  deleteRoles(id: number){
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}

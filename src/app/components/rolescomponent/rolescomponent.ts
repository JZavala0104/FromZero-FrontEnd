import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RolesList } from './roles-list/roles-list';

@Component({
  selector: 'app-rolescomponent',
  imports: [RouterOutlet, RolesList],
  templateUrl: './rolescomponent.html',
  styleUrl: './rolescomponent.css',
})
export class Rolescomponent {
  constructor(public route: ActivatedRoute) { }
}
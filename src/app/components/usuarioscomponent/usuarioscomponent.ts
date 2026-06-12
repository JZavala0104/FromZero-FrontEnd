import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuariosList } from './usuarios-list/usuarios-list';

@Component({
  selector: 'app-usuarioscomponent',
  imports: [RouterOutlet, UsuariosList],
  templateUrl: './usuarioscomponent.html',
  styleUrl: './usuarioscomponent.css',
})
export class Usuarioscomponent {
  constructor(public route: ActivatedRoute) { }
}

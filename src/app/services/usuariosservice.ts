import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuarios } from '../models/Usuarios';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usuariosservice {
  private url = `${base_url}/api/usuarios`;
 private listaCambio = new Subject<Usuarios[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuarios[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<Usuarios>(`${this.url}/Get/${id}`);
  }
  insert(usuario: Usuarios) {
    return this.http.post(`${this.url}/Post`, usuario);
  }
  update(usuario: Usuarios) {
    return this.http.put(`${this.url}/Put`, usuario, {responseType: 'text'});
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }

  setList(listaNueva: Usuarios[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}

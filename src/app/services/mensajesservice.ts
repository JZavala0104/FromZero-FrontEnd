import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Mensajes } from '../models/Mensajes';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Mensajesservice {
  private url = `${base_url}/api/mensajes`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Mensajes[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<Mensajes>(`${this.url}/Get/${id}`);
  }
  listByProyecto(idProyecto: number) {
    return this.http.get<Mensajes[]>(`${this.url}/GetByProyecto/${idProyecto}`);
  }
  insert(mensaje: Mensajes) {
    return this.http.post<Mensajes>(`${this.url}/Post`, mensaje);
  }
  update(mensaje: Mensajes) {
    return this.http.put(`${this.url}/Put`, mensaje, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}

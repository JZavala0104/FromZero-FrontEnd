import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Notificaciones } from '../models/Notificaciones';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Notificacionesservice {
  private url = `${base_url}/api/notificaciones`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Notificaciones[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<Notificaciones>(`${this.url}/Get/${id}`);
  }
  insert(notificacion: Notificaciones) {
  return this.http.post(`${this.url}/Post`, notificacion);
  }
  update(notificacion: Notificaciones) {
    return this.http.put(`${this.url}/Put`, notificacion,{ responseType: 'text' });
  } 
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Proyectos } from '../models/Proyectos';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Proyectosservice {
  private url = `${base_url}/api/proyectos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Proyectos[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<Proyectos>(`${this.url}/Get/${id}`);
  }
  insert(proyecto: Proyectos) {
    return this.http.post(`${this.url}/Post`, proyecto);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}
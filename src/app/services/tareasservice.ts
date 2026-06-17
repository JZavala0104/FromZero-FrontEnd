import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Tareas } from '../models/Tareas';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Tareasservice {
  private url = `${base_url}/api/tareas`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Tareas[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<Tareas>(`${this.url}/Get/${id}`);
  }
  insert(tarea: Tareas) {
  return this.http.post(`${this.url}/Post`, tarea);
  }
  update(tarea: Tareas) {
    return this.http.put(`${this.url}/Put`, tarea,{ responseType: 'text' });
  } 
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}

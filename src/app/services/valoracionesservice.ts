import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Valoraciones } from '../models/Valoraciones';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Valoracionesservice {
  private url = `${base_url}/api/valoraciones`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Valoraciones[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<Valoraciones>(`${this.url}/Get/${id}`);
  }
  insert(valoracion: Valoraciones) {
  return this.http.post(`${this.url}/Post`, valoracion);
  }
  update(valoracion: Valoraciones) {
    return this.http.put(`${this.url}/Put`, valoracion,{ responseType: 'text' });
  } 
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}

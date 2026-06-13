import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Empresas } from '../models/Empresas';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Empresasservice {
  private url = `${base_url}/api/empresas`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Empresas[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<Empresas>(`${this.url}/Get/${id}`);
  }
  insert(empresa: Empresas) {
    return this.http.post(`${this.url}/Post`, empresa);
  }
  update(empresa: Empresas) {
    return this.http.put(`${this.url}/Put`, empresa, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}
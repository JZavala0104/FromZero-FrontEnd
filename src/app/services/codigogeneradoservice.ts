import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CodigoGenerado } from '../models/CodigoGenerado';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Codigogeneradoservice {
  private url = `${base_url}/api/codigogenerado`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<CodigoGenerado[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<CodigoGenerado>(`${this.url}/Get/${id}`);
  }
  insert(codigogenerado: CodigoGenerado) {
    return this.http.post(`${this.url}/Post`, codigogenerado);
  }
  update(codigogenerado: CodigoGenerado) {
    return this.http.put(`${this.url}/Put`, codigogenerado,{ responseType: 'text' });
  } 
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}

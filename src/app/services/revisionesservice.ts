import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Revisiones } from '../models/Revisiones';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Revisionesservice {
  private url = `${base_url}/api/revisiones`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Revisiones[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<Revisiones>(`${this.url}/Get/${id}`);
  }
  insert(revision: Revisiones) {
  return this.http.post(`${this.url}/Post`, revision);
  }
  update(revision: Revisiones) {
    return this.http.put(`${this.url}/Put`, revision,{ responseType: 'text' });
  } 
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TipsIA } from '../models/TipsIA';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Tipsiaservice {
  private url = `${base_url}/api/tipsia`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipsIA[]>(`${this.url}/Get`);
  }
  listById(id: number) {
    return this.http.get<TipsIA>(`${this.url}/Get/${id}`);
  }
  insert(tipsia: TipsIA) {
  return this.http.post(`${this.url}/Post`, tipsia);
  }
  update(tipsia: TipsIA) {
    return this.http.put(`${this.url}/Put`, tipsia,{ responseType: 'text' });
  } 
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }
}

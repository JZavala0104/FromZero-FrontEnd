import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/Roles';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Rolesservice {
  private url = `${base_url}/api/rol`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Roles[]>(`${this.url}/lista`);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProyectoDesarrollador } from '../models/ProyectoDesarrollador';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Proyectodesarrolladorservice {
  private url = `${base_url}/api/proyectodesarrollador`;
  private listaCambio = new Subject<ProyectoDesarrollador[]>();
  constructor(private http: HttpClient) {}

  list(): Observable<ProyectoDesarrollador[]> {
    return this.http.get<ProyectoDesarrollador[]>(`${this.url}/Get`).pipe(catchError(() => of([])));
  }
  listById(id: number) {
    return this.http.get<ProyectoDesarrollador>(`${this.url}/Get/${id}`);
  }
  insert(pd: ProyectoDesarrollador) {
    return this.http.post<ProyectoDesarrollador>(`${this.url}/Post`, pd);
  }
  update(pd: ProyectoDesarrollador) {
    return this.http.put(`${this.url}/Put`, pd, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/Delete/${id}`, { responseType: 'text' });
  }

  setList(listaNueva: ProyectoDesarrollador[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}

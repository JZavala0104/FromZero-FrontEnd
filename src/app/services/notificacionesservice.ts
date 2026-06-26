import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Notificaciones } from '../models/Notificaciones';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Notificacionesservice {
  private url = `${base_url}/api/notificaciones`;
  private listaCambio = new Subject<Notificaciones[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Notificaciones[]> {
    return this.http.get<Notificaciones[]>(`${this.url}/Get`).pipe(
      catchError(err => err?.status === 404 ? of([]) : of([]))
    );
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

  setList(listaNueva: Notificaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  
}

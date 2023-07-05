import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environments } from './../../environments/environments';
import { Ruolo } from '../models/ruolo.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = `${environments.apiUrl}/clienti`;

  constructor(private http: HttpClient) {}

  getClienti(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    const url = `${this.apiUrl}/${cliente.id}`;
    return this.http.put<Cliente>(url, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getRuoloByClienteId(id: number): Observable<Ruolo> {
    const url = `${this.apiUrl}/${id}/ruolo`;
    return this.http.get<Ruolo>(url);
  }
}

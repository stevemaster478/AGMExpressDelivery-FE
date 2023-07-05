import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indirizzo } from '../models/indirizzo.model';
import { environments } from './../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class IndirizzoService {
  private apiUrl: string = `${environments.apiUrl}/indirizzi`;

  constructor(private http: HttpClient) {}

  getIndirizzi(): Observable<Indirizzo[]> {
    return this.http.get<Indirizzo[]>(this.apiUrl);
  }

  getIndirizzo(id: number): Observable<Indirizzo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Indirizzo>(url);
  }

  createIndirizzo(indirizzo: Indirizzo): Observable<Indirizzo> {
    return this.http.post<Indirizzo>(this.apiUrl, indirizzo);
  }

  updateIndirizzo(indirizzo: Indirizzo): Observable<Indirizzo> {
    const url = `${this.apiUrl}/${indirizzo.id}`;
    return this.http.put<Indirizzo>(url, indirizzo);
  }

  deleteIndirizzo(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consegna } from '../models/consegna.model';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ConsegnaService {
  private apiUrl = `${environments.apiUrl}/consegne`; // Aggiorna l'URL con l'endpoint corretto per le consegne

  constructor(private http: HttpClient) {}

  getConsegne(): Observable<Consegna[]> {
    return this.http.get<Consegna[]>(this.apiUrl);
  }

  getConsegna(id: number): Observable<Consegna> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Consegna>(url);
  }

  createConsegna(consegna: Consegna): Observable<Consegna> {
    return this.http.post<Consegna>(this.apiUrl, consegna);
  }

  updateConsegna(id: number, consegna: Consegna): Observable<Consegna> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Consegna>(url, consegna);
  }

  deleteConsegna(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}

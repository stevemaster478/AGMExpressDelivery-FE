import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacco } from '../models/pacco.model';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PaccoService {
  private apiUrl = `${environments.apiUrl}/pacchi`; // Aggiorna l'URL con l'endpoint corretto per i pacchi

  constructor(private http: HttpClient) {}

  getPacchi(): Observable<Pacco[]> {
    return this.http.get<Pacco[]>(this.apiUrl);
  }

  getPacco(id: number): Observable<Pacco> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pacco>(url);
  }

  createPacco(pacco: Pacco): Observable<Pacco> {
    return this.http.post<Pacco>(this.apiUrl, pacco);
  }

  updatePacco(id: number, pacco: Pacco): Observable<Pacco> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Pacco>(url, pacco);
  }

  deletePacco(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}

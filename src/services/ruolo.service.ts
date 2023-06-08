import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruolo } from '../models/ruolo.model';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RuoloService {
  private apiUrl = `${environments.apiUrl}/ruoli`;

  constructor(private http: HttpClient) {}

  getRuoli(): Observable<Ruolo[]> {
    return this.http.get<Ruolo[]>(this.apiUrl);
  }

  getRuolo(id: number): Observable<Ruolo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Ruolo>(url);
  }

  createRuolo(ruolo: Ruolo): Observable<Ruolo> {
    return this.http.post<Ruolo>(this.apiUrl, ruolo);
  }

  updateRuolo(id: number, ruolo: Ruolo): Observable<Ruolo> {
    const url = `${this.apiUrl}/${ruolo.id}`;
    return this.http.put<Ruolo>(url, ruolo);
  }

  deleteRuolo(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

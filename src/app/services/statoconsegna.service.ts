import { StatoConsegna } from './../models/statoconsegna.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class StatoConsegnaService {
  private apiUrl = `${environments.apiUrl}/stato_consegna`;

  constructor(private http: HttpClient) {}

  getStatiConsegna(): Observable<StatoConsegna[]> {
    return this.http.get<StatoConsegna[]>(this.apiUrl);
  }

  getStatoConsegna(id: number): Observable<StatoConsegna> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<StatoConsegna>(url);
  }

  createStatoConsegna(statoConsegna: StatoConsegna): Observable<StatoConsegna> {
    return this.http.post<StatoConsegna>(this.apiUrl, statoConsegna);
  }

  updateStatoConsegna(statoConsegna: StatoConsegna): Observable<StatoConsegna> {
    const url = `${this.apiUrl}/${statoConsegna.id}`;
    return this.http.put<StatoConsegna>(url, statoConsegna);
  }

  deleteStatoConsegna(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}


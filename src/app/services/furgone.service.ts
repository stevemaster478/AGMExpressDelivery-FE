import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Furgone } from '../models/furgone.model';
import { environments } from './../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FurgoneService {
  private apiUrl = `${environments.apiUrl}/furgoni`;

  constructor(private http: HttpClient) {}

  getFurgoni(): Observable<Furgone[]> {
    return this.http.get<Furgone[]>(this.apiUrl);
  }

  getFurgone(id: number): Observable<Furgone> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Furgone>(url);
  }

  createFurgone(furgone: Furgone): Observable<Furgone> {
    return this.http.post<Furgone>(this.apiUrl, furgone);
  }

  updateFurgone(id: number, furgone: Furgone): Observable<Furgone> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Furgone>(url, furgone);
  }

  deleteFurgone(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

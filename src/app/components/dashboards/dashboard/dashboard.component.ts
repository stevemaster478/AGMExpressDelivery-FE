import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';
import { AuthService, User } from '@auth0/auth0-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: Cliente[] = [];
  user!: Cliente;
  isUserAdminOrUtente: boolean = false;

  constructor(
    private clienteService: ClienteService,
    public auth: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() { }
}

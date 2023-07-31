import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from './../../../models/cliente.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  private users: Cliente[] = [];
  private user!: Cliente;
  ruolo: Cliente = {
    id: 1,
    nome: 'pippo',
    partitaIva: 1234567890,
    cognome: 'rossi',
    numeroTelefono: '1234567890',
    pacchiInviati: [],
    pacchiRicevuti: [],
    ruolo: 'admin',
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClienti().subscribe((clienti) => {
      this.users = clienti;
      console.log('users: ', this.users);
      this.user = this.users[0];
      console.log('user scelto', this.user);

      localStorage.setItem('loggedUser', JSON.stringify(this.user));

      this.setCurrentRole(1); //passerò il ruolo che riceverò .id
    });
  }

  setCurrentRole(role: number) {}
}

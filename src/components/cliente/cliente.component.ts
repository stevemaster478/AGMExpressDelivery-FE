import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  clienti: Cliente[] = [];
  clienteSelezionato?: Cliente;
  clienteModifica: Cliente | null;
  modalitaModifica = false;

  constructor(private clienteService: ClienteService) {
    this.clienteModifica = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
    };
    this.clienteSelezionato = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
    };

    this.nuovoCliente = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
    };
  }

  ngOnInit(): void {
    this.caricaClienti();
  }
  attivaModifica(cliente: Cliente) {
    this.modalitaModifica = true;
    this.clienteModifica = { ...cliente };
  }
  salvaModifiche() {
    if (this.clienteModifica) {
      this.clienteService
        .updateCliente(this.clienteModifica)
        .subscribe((clienteModificato) => {
          // Aggiorna il cliente nella lista
          const index = this.clienti.findIndex(
            (cliente) => cliente.id === clienteModificato.id
          );
          if (index !== -1) {
            this.clienti[index] = clienteModificato;
          }
          this.modalitaModifica = false;
          this.clienteModifica = null;
        });
    }
  }

  caricaClienti(): void {
    this.clienteService.getClienti().subscribe((clienti) => {
      this.clienti = clienti;
    });
  }

  visualizzaDettagli(id: number): void {
    this.clienteService.getCliente(id).subscribe((cliente) => {
      this.clienteSelezionato = cliente;
    });
  }
  nuovoCliente: Cliente = {
    id: 0,
    nome: '',
    partitaIva: 0,
    cognome: '',
    numeroTelefono: '',
    pacchiInviati: [],
    pacchiRicevuti: [],
  };

  creaCliente(): void {
    this.clienteService
      .createCliente(this.nuovoCliente)
      .subscribe((clienteCreato) => {
        this.clienti.push(clienteCreato);
        this.clienteSelezionato = clienteCreato;
      });
  }

  eliminaCliente(id: number): void {
    if (confirm('Sei sicuro di voler eliminare il cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(() => {
        this.caricaClienti();
        this.clienteSelezionato = undefined;
      });
    }
  }
}

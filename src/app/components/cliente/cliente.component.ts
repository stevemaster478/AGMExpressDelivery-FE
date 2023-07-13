import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import {
  faCoffee,
  IconDefinition,
  IconLookup,
} from '@fortawesome/free-solid-svg-icons';
import { RuoloService } from 'src/app/services/ruolo.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  selectClient() {
    throw new Error('Method not implemented.');
  }

  faCoffee: IconLookup = faCoffee;

  clienti: Cliente[] = [];
  clienteSelezionato?: Cliente;
  clienteModifica: Cliente | null;
  modalitaModifica = false;

  constructor(
    private clienteService: ClienteService,
    private ruoloService: RuoloService
  ) {
    this.clienteModifica = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
      ruolo: { id: 0, nome: '' },
    };
    this.clienteSelezionato = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
      ruolo: { id: 0, nome: '' },
    };

    this.nuovoCliente = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
      ruolo: { id: 0, nome: '' },
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
      for (const cliente of clienti) {
        this.clienteService
          .getRuoloByClienteId(cliente.id)
          .subscribe((ruolo) => {
            cliente.ruolo.nome = ruolo.nome;
          });
      }
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
    ruolo: { id: 0, nome: '' },
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

  perform() {
    console.log('ciaoooo');
  }
}

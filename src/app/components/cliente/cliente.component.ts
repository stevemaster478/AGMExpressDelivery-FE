import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { faCoffee, IconDefinition, IconLookup } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  selectClient(cliente: Cliente) {
    this.clienteSelezionato = cliente;
    this.clienteModifica = { ...cliente }; // Imposta il cliente selezionato nel form di modifica

    // Apri il modal di modifica utilizzando JavaScript vanilla
    const editModal = document.getElementById('editModal');
    if (editModal) {
      editModal.classList.add('show'); // Mostra il modal
      editModal.style.display = 'block'; // Mostra il modal
      document.body.classList.add('modal-open'); // Aggiungi la classe per disabilitare lo sfondo
    }
  }

  faCoffee: IconLookup = faCoffee;

  clienti: Cliente[] = [];
  clienteSelezionato?: Cliente;
  clienteModifica: Cliente | null = null;
  modalitaModifica = false;

  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal
  ) {
    this.clienteModifica = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
      ruolo: '',
    };
    this.clienteSelezionato = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
      ruolo: '',
    };

    this.nuovoCliente = {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
      ruolo: '',
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

  closeEditModal() {
  this.modalService.dismissAll();
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
    ruolo: '',
  };

  creaCliente(): void {
    this.clienteService
      .createCliente(this.nuovoCliente)
      .subscribe((clienteCreato) => {
        this.clienti.push(clienteCreato);
        this.clienteSelezionato = clienteCreato;
      });
  }

  deleteClient(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente.id).subscribe(() => {
      this.caricaClienti();
      this.clienteSelezionato = undefined;
    });
  }

  perform() {
    console.log('chiaoooo');
  }
}

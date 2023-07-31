import { Cliente } from './../../models/cliente.model';
import { IndirizzoService } from './../../services/indirizzo.service';
import { Indirizzo } from './../../models/indirizzo.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-indirizzo',
  templateUrl: './indirizzo.component.html',
  styleUrls: ['./indirizzo.component.css']
})
export class IndirizzoComponent {

  indirizzi: Indirizzo[] = [];
  indirizzoSelezionato?: Indirizzo;
  indirizzoModifica: Indirizzo | null;
  modalitaModifica = false;

  constructor(private indirizzoService: IndirizzoService){
    this.indirizzoSelezionato = {
      id: 0,
      via: '',
      cap: 0,
      numeroCivico: 0,
      interno: '',
      citta: '',
      cliente: {
        id: 0,
        nome: '',
        partitaIva: 0,
        cognome: '',
        numeroTelefono: '',
        pacchiInviati: [],
        pacchiRicevuti: [],
<<<<<<< HEAD
        ruolo: { id: 0, nome: '' }
=======
        ruolo: '',
>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
      },
    };
    this.indirizzoModifica = {
      id: 0,
      via: '',
      cap: 0,
      numeroCivico: 0,
      interno: '',
      citta: '',
      cliente: {
        id: 0,
        nome: '',
        partitaIva: 0,
        cognome: '',
        numeroTelefono: '',
        pacchiInviati: [],
        pacchiRicevuti: [],
<<<<<<< HEAD
        ruolo: { id: 0, nome: '' }
=======
        ruolo: '',
>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
      },
    };
  }

  attivaModifica(indirizzo: Indirizzo) {
    this.modalitaModifica = true;
    this.indirizzoModifica = { ...indirizzo };
  }

  ngOnInit(): void{
    this.caricaIndirizzi();

  }

  caricaIndirizzi(): void {
    this.indirizzoService.getIndirizzi().subscribe((indirizzi) => {
      this.indirizzi = indirizzi;
    });
  }

  visualizzaDettagli(id: number): void {
    this.indirizzoService.getIndirizzo(id).subscribe((indirizzo) => {
      this.indirizzoSelezionato = indirizzo;
    });
  }

  nuovoIndirizzo: Indirizzo = {
    id: 0,
    via: '',
    cap: 0,
    numeroCivico: 0,
    interno: '',
    citta: '',
    cliente: {
      id: 0,
      nome: '',
      partitaIva: 0,
      cognome: '',
      numeroTelefono: '',
      pacchiInviati: [],
      pacchiRicevuti: [],
<<<<<<< HEAD
      ruolo: { id: 0, nome: '' }
=======
      ruolo: ''
>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
    },
  }

  creaIndirizzo(): void {
    this.indirizzoService.createIndirizzo(this.nuovoIndirizzo).subscribe((indirizzoCreato) => {

        this.indirizzi.push(indirizzoCreato);
        this.indirizzoSelezionato = indirizzoCreato;

      });
  }

  eliminaIndirizzo(id: number): void {
    if (confirm('Sei sicuro di voler eliminare l\'indirizzo?')) {
      this.indirizzoService.deleteIndirizzo(id).subscribe(() => {
        this.caricaIndirizzi();
        this.indirizzoSelezionato = undefined;
      });
    }
  }

  salvaModifiche() {
    if (this.indirizzoModifica) {
      this.indirizzoService.updateIndirizzo(this.indirizzoModifica).subscribe((indirizzoModificato) => {

          const index = this.indirizzi.findIndex(
            (indirizzo) => indirizzo.id === indirizzoModificato.id
          );
          if (index !== -1) {
            this.indirizzi[index] = indirizzoModificato;
          }
          this.modalitaModifica = false;
          this.indirizzoModifica = null;
        });

    }
  }






}

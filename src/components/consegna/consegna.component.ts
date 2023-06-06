import { Component, OnInit } from '@angular/core';
import { Consegna } from '../../models/consegna.model';
import { ConsegnaService } from '../../services/consegna.service';

@Component({
  selector: 'app-consegna',
  templateUrl: './consegna.component.html',
  styleUrls: ['./consegna.component.css'],
})
export class ConsegnaComponent implements OnInit {
  consegne: Consegna[] = [];
  consegnaSelezionata?: Consegna;
  consegnaModifica: Consegna | null = null;
  modalitaModifica = false;
  nuovaConsegna: Consegna = {
    id: 0,
    inizioConsegnaData: '',
    fineConsegnaData: '',
    targa: '',
    idStatoConsegna: 0,
    furgone: {
      id: 0,
      targa: '',
      capacita: 0,
      modello: '',
    },
    statoConsegna: {
      id: 0,
      avanzamento: '',
      statoConsegna: '',
    },
    pacchi: [],
  };

  constructor(private consegnaService: ConsegnaService) {}

  ngOnInit(): void {
    this.caricaConsegne();
  }

  attivaModifica(consegna: Consegna) {
    this.modalitaModifica = true;
    this.consegnaModifica = { ...consegna };
  }

  salvaModifiche() {
    const consegnaModifica = this.consegnaModifica;
    if (consegnaModifica) {
      this.consegnaService
        .updateConsegna(consegnaModifica.id, consegnaModifica)
        .subscribe(() => {
          const index = this.consegne.findIndex(
            (consegna) => consegna.id === consegnaModifica.id
          );
          if (index !== -1) {
            this.consegne[index] = consegnaModifica;
          }
          this.modalitaModifica = false;
          this.consegnaModifica = null;
        });
    }
  }

  creaConsegna() {
    this.consegnaService
      .createConsegna(this.nuovaConsegna)
      .subscribe((consegna) => {
        this.consegne.push(consegna);
        this.nuovaConsegna = {
          id: 0,
          inizioConsegnaData: '',
          fineConsegnaData: '',
          targa: '',
          idStatoConsegna: 1,
          furgone: {
            id: 0,
            targa: '',
            capacita: 0,
            modello: '',
          },
          statoConsegna: {
            id: 1,
            avanzamento: '',
            statoConsegna: '',
          },
          pacchi: [],
        };
      });
  }

  caricaConsegne(): void {
    this.consegnaService.getConsegne().subscribe((consegne) => {
      this.consegne = consegne;
    });
  }

  selezionaConsegna(id: number): void {
    this.consegnaService.getConsegna(id).subscribe((consegna) => {
      this.consegnaSelezionata = consegna;
    });
  }

  eliminaConsegna(id: number): void {
    this.consegnaService.deleteConsegna(id).subscribe(() => {
      this.consegne = this.consegne.filter((c) => c.id !== id);
      this.consegnaSelezionata = undefined;
    });
  }
}

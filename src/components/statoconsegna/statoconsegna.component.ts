import { Component, OnInit } from '@angular/core';
import { StatoConsegna } from '../../models/statoconsegna.model';
import { StatoConsegnaService } from '../../services/statoconsegna.service';

@Component({
  selector: 'app-statoconsegna',
  templateUrl: './statoconsegna.component.html',
  styleUrls: ['./statoconsegna.component.css'],
})
export class StatoConsegnaComponent implements OnInit {
  statiConsegna: StatoConsegna[] = [];
  statoConsegna: StatoConsegna = {
    id: 0,
    avanzamento: '',
    statoConsegna: '',
  };
  editing = false;

  constructor(private statoConsegnaService: StatoConsegnaService) {}

  ngOnInit(): void {
    this.getStatiConsegna();
    this.getStatoConsegna(1); // Esempio di ID da recuperare
  }

  getStatiConsegna(): void {
    this.statoConsegnaService
      .getStatiConsegna()
      .subscribe((statiConsegna) => (this.statiConsegna = statiConsegna));
  }

  getStatoConsegna(id: number): void {
    this.statoConsegnaService
      .getStatoConsegna(id)
      .subscribe((statoConsegna) => (this.statoConsegna = statoConsegna));
  }

  editStatoConsegna(stato: StatoConsegna): void {
    this.statoConsegna = { ...stato };
    this.editing = true;
  }

  saveStatoConsegna(): void {
    if (this.editing) {
      this.updateStatoConsegna();
    } else {
      this.createStatoConsegna();
    }
  }

  createStatoConsegna(): void {
    this.statoConsegnaService
      .createStatoConsegna(this.statoConsegna)
      .subscribe((newStatoConsegna) => {
        this.statiConsegna.push(newStatoConsegna);
        this.resetForm();
      });
  }

  updateStatoConsegna(): void {
    this.statoConsegnaService
      .updateStatoConsegna(this.statoConsegna)
      .subscribe((updatedStatoConsegna) => {
        const index = this.statiConsegna.findIndex(
          (s) => s.id === updatedStatoConsegna.id
        );
        if (index !== -1) {
          this.statiConsegna[index] = updatedStatoConsegna;
        }
        this.resetForm();
      });
  }

  deleteStatoConsegna(id: number): void {
    this.statoConsegnaService.deleteStatoConsegna(id).subscribe(() => {
      this.statiConsegna = this.statiConsegna.filter((s) => s.id !== id);
      this.resetForm();
    });
  }

  resetForm(): void {
    this.statoConsegna = {
      id: 0,
      avanzamento: '',
      statoConsegna: '',
    };
    this.editing = false;
  }
}

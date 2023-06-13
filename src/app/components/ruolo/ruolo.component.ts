import { Component, OnInit } from '@angular/core';
import { Ruolo } from '../../models/ruolo.model';
import { RuoloService } from '../../services/ruolo.service';

@Component({
  selector: 'app-ruolo',
  templateUrl: './ruolo.component.html',
  styleUrls: ['./ruolo.component.css'],
})
export class RuoloComponent implements OnInit {
  ruoli: Ruolo[] = [];
  ruolo: Ruolo = {
    id: 0,
    nome: '',
  };
  editMode = false;
  isNewRuolo = false;

  constructor(private ruoloService: RuoloService) {}

  ngOnInit() {
    this.loadRuoli();
  }

  loadRuoli() {
    this.ruoloService.getRuoli().subscribe((data) => {
      this.ruoli = data;
    });
  }

  editRuolo(ruolo: Ruolo) {
    this.editMode = true;
    this.isNewRuolo = false;
    this.ruolo = Object.assign({}, ruolo); // Clona l'oggetto ruolo
  }

  saveRuolo() {
    if (this.isNewRuolo) {
      this.ruoloService.createRuolo(this.ruolo).subscribe(() => {
        this.resetForm();
        this.loadRuoli();
      });
    } else {
      this.ruoloService.updateRuolo(this.ruolo.id, this.ruolo).subscribe(() => {
        this.resetForm();
        this.loadRuoli();
      });
    }
  }

  deleteRuolo(id: number) {
    if (confirm('Sei sicuro di voler eliminare il ruolo?')) {
      this.ruoloService.deleteRuolo(id).subscribe(() => {
        this.loadRuoli();
      });
    }
  }

  resetForm() {
    this.editMode = false;
    this.isNewRuolo = false;
    this.ruolo = {
      id: 0,
      nome: '',
    };
  }

  addRuolo() {
    this.resetForm();
    this.isNewRuolo = true;
  }
}

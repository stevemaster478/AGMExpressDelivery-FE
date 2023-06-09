import { Component, OnInit } from '@angular/core';
import { Pacco } from 'src/models/pacco.model';

@Component({
  selector: 'app-pacco',
  templateUrl: './pacco.component.html',
  styleUrls: ['./pacco.component.css']
})
export class PaccoComponent implements OnInit {
  ngOnInit() {
    pacchi: Pacco[] = [];
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: `<div>Caricamento...</div>`,
})
export class CallbackComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.router.navigate(['/dashboard']);
  }
}

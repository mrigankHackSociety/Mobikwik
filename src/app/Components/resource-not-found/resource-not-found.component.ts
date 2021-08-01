import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-not-found',
  templateUrl: './resource-not-found.component.html',
  styleUrls: ['./resource-not-found.component.css'],
})
export class ResourceNotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  returnToHomePage(): void {
    this.router.navigate(['']);
  }
}

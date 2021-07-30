import { SavedCardService } from './../../Services/saved-card.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedCard } from 'src/app/Models/SavedCard.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-saved-card',
  templateUrl: './manage-saved-card.component.html',
  styleUrls: ['./manage-saved-card.component.css'],
})
export class ManageSavedCardComponent implements OnInit {
  savedCards$: Observable<SavedCard[]>;

  constructor(private savedCardService: SavedCardService) {}

  ngOnInit(): void {
    this.getAllSavedCards();
  }

  getAllSavedCards(): void {
    this.savedCards$ = this.savedCardService.getSavedCards();
  }
}

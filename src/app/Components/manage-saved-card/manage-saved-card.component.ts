import { appContants } from 'src/app/Constants/app-constants';
import { SavedCardService } from './../../Services/saved-card.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedCard } from 'src/app/Models/SavedCard.model';
import { MatDialog } from '@angular/material/dialog';
import { AddCardComponent } from '../add-card/add-card.component';
import { RemoveCardComponent } from '../remove-card/remove-card.component';

@Component({
  selector: 'app-manage-saved-card',
  templateUrl: './manage-saved-card.component.html',
  styleUrls: ['./manage-saved-card.component.css'],
})
export class ManageSavedCardComponent implements OnInit {
  savedCards$: Observable<SavedCard[]>;
  spinnerDiameter: string = appContants.spninnerDiameter;

  constructor(
    private savedCardService: SavedCardService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllSavedCards();
  }

  getAllSavedCards(): void {
    this.savedCards$ = this.savedCardService.getSavedCards();
  }

  trackByCardId(index: number, cardDetails: SavedCard): number {
    return cardDetails?.id;
  }

  openAddNewCardDialog(): void {
    const dialogRef = this.dialog.open(AddCardComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.getAllSavedCards();
    });
  }

  openRemoveCardDialog(selectedCardDetails: SavedCard): void {
    const dialogRef = this.dialog.open(RemoveCardComponent, {
      width: '350px',
      data: selectedCardDetails?.id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.getAllSavedCards();
    });
  }
}

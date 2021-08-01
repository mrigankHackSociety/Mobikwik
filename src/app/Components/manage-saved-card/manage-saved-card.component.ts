import { appContants } from 'src/app/Constants/app-constants';
import { SavedCardService } from './../../Services/saved-card.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedCard } from 'src/app/Models/SavedCard.model';
import { MatDialog } from '@angular/material/dialog';
import { AddCardComponent } from '../add-card/add-card.component';
import { RemoveCardComponent } from '../remove-card/remove-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllSavedCards();
  }

  getAllSavedCards(): void {
    this.savedCards$ = this.savedCardService.getSavedCards();
  }

  trackByCardId(index: number, cardDetails: SavedCard): number {
    return cardDetails.id!;
  }

  openAddNewCardDialog(): void {
    const dialogRef = this.dialog.open(AddCardComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getAllSavedCards();
        this.snackBar.open('Card Saved Successfully', 'OK', {
          duration: appContants.snackBarDuration,
        });
      }
    });
  }

  openRemoveCardDialog(selectedCardDetails: SavedCard): void {
    const dialogRef = this.dialog.open(RemoveCardComponent, {
      width: '400px',
      data: selectedCardDetails?.id,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getAllSavedCards();
        this.snackBar.open('Card Removed Successfully', 'OK', {
          duration: appContants.snackBarDuration,
        });
      }
    });
  }
}

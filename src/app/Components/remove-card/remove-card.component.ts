import { appContants } from 'src/app/Constants/app-constants';
import { Subscription } from 'rxjs';
import { SavedCardService } from './../../Services/saved-card.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-remove-card',
  templateUrl: './remove-card.component.html',
  styleUrls: ['./remove-card.component.css'],
})
export class RemoveCardComponent implements OnInit, OnDestroy {
  displayLoader: boolean = false;
  removeCardSubscription: Subscription;
  spinnerDiameter: string = appContants.spninnerDiameter;

  constructor(
    public dialogRef: MatDialogRef<RemoveCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private savedCardService: SavedCardService
  ) {
    this.removeCardSubscription = new Subscription();
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.removeCardSubscription.unsubscribe();
  }
  deleteCard(): void {
    this.displayLoader = true;
    this.removeCardSubscription.add(
      this.savedCardService
        .removeCard(this.data as number)
        .pipe(finalize(() => (this.displayLoader = false)))
        .subscribe((res) => {
          if (res) {
            this.dialogRef.close(true);
          }
        })
    );
  }
}

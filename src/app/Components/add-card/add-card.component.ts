import { SavedCard } from './../../Models/SavedCard.model';
import { appContants } from 'src/app/Constants/app-constants';
import { SavedCardService } from './../../Services/saved-card.service';
import { SharedServiceService } from './../../Shared/Service/shared-service.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ValidateCvvNumber } from 'src/app/Shared/Custom Validators/cvv-validator.validator';
import { ValidateCardNumber } from 'src/app/Shared/Custom Validators/card-validator.validator';
import { distinctUntilChanged, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit, OnDestroy {
  addNewCardForm: FormGroup;
  expiryMonthArray: string[] = [];
  expiryYearArray: string[] = [];
  cardFormControlObj: any = {};
  cardFormSubscription: Subscription;
  displayLoader: boolean = false;
  spinnerDiameter: string = appContants.spninnerDiameter;

  constructor(
    public dialogRef: MatDialogRef<AddCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private sharedService: SharedServiceService,
    private savedCardService: SavedCardService
  ) {
    this.cardFormSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.initialiseCardFormAndControls();
    this.checkCardNetworkOnUserInput();
    this.expiryMonthArray = this.sharedService.numberRange({
      startRange: 1,
      endRange: 12,
      addZero: true,
    });
    this.expiryYearArray = this.sharedService
      .numberRange({
        startRange: 2010,
        endRange: 2025,
      })
      .filter((item) => new Date().getFullYear() <= +item);
  }
  ngOnDestroy(): void {
    this.cardFormSubscription.unsubscribe();
  }

  // creates form group and add controls to object to avoid lookup and for reference
  initialiseCardFormAndControls(): void {
    this.addNewCardForm = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        ValidateCardNumber(this.sharedService),
      ]),
      cardNetwork: new FormControl('', [Validators.required]),
      cardExpiryMonth: new FormControl('', [Validators.required]),
      cardExpiryYear: new FormControl('', [Validators.required]),
      cvvNumber: new FormControl('', [Validators.required, ValidateCvvNumber]),
    });
    Object.keys(this.addNewCardForm.controls).forEach((element) => {
      this.cardFormControlObj[element] = this.addNewCardForm.get(`${element}`);
    });
  }

  checkCardNetworkOnUserInput(): void {
    this.cardFormSubscription.add(
      this.addNewCardForm
        .get('cardNumber')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((res) => {
          this.addNewCardForm.patchValue({
            cardNetwork: this.sharedService.getCardNetwork(res),
          });
        })
    );
  }

  addNewCard(): void {
    if (this.addNewCardForm.valid) {
      this.displayLoader = true;
      const newCardPayload = (({
        cardNumber,
        cardNetwork,
        cardExpiryMonth,
        cardExpiryYear,
      }) => ({ cardNumber, cardNetwork, cardExpiryMonth, cardExpiryYear }))(
        this.addNewCardForm.value
      );
      this.cardFormSubscription.add(
        this.savedCardService
          .saveNewCard(newCardPayload as SavedCard)
          .pipe(finalize(() => (this.displayLoader = false)))
          .subscribe((res) => {
            if (res) {
              this.dialogRef.close(true);
            }
          })
      );
    } else {
      this.addNewCardForm.markAllAsTouched();
    }
  }
}

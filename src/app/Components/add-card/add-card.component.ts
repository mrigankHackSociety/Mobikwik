import { SavedCardService } from './../../Services/saved-card.service';
import { SharedServiceService } from './../../Shared/Service/shared-service.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ValidateCvvNumber } from 'src/app/Shared/Custom Validators/cvv-validator.validator';
import { ValidateCardNumber } from 'src/app/Shared/Custom Validators/card-validator.validator';
import { SavedCard } from 'src/app/Models/SavedCard.model';

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
    this.expiryMonthArray = this.sharedService.numberRange(1, 12, 1, true);
    this.expiryYearArray = this.sharedService
      .numberRange(2010, 2025)
      .filter((item) => new Date().getFullYear() <= +item);
  }
  ngOnDestroy(): void {
    this.cardFormSubscription.unsubscribe();
  }

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
      this.addNewCardForm.get('cardNumber')?.valueChanges.subscribe((res) => {
        const userCardNetwork = this.sharedService.getCardNetwork(res);
        this.addNewCardForm.patchValue({ cardNetwork: userCardNetwork });
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
          .subscribe((res) => {
            if (res) {
              this.displayLoader = false;
              this.addNewCardForm.reset();
              this.dialogRef.close(true);
            } else {
              this.displayLoader = false;
            }
          })
      );
    } else {
      this.addNewCardForm.markAllAsTouched();
    }
  }
}

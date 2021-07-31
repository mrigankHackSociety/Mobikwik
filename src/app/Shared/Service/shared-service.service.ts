import { appContants } from './../../Constants/app-constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  constructor() {}

  numberRange(
    start: number,
    end: number,
    step: number = 1,
    addZero: boolean = false
  ): string[] {
    if (start === end) {
      return [start < 10 && addZero ? `0${start}` : `${start}`];
    }
    return [
      start < 10 && addZero ? `0${start}` : `${start}`,
      ...this.numberRange(start + step, end),
    ];
  }

  getCardNetwork(userInput: string): string {
    const userCardNumberInput = userInput.replace(/\s/g, "");
    if (new RegExp(appContants.visaCardRegex
    ).test(userCardNumberInput)) {
      return 'Visa';
    } else if (
      new RegExp(appContants.masterCardRegex).test(userCardNumberInput) ||
      new RegExp(appContants.masterCardRegex2).test(userCardNumberInput)
    ) {
      return 'Mastercard';
    } else if (new RegExp(appContants.amexCardRegex).test(userCardNumberInput)) {
      return 'Amex';
    } else {
      return '';
    }
  }
}

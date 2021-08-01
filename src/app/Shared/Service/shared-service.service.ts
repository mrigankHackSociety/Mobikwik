import { appContants } from './../../Constants/app-constants';
import { Injectable } from '@angular/core';
import { StepRange } from '../Models/step-range';
@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  constructor() {}

  numberRange(stepRangeDetails): string[] {
    const {
      startRange,
      endRange,
      step = 1,
      addZero = false,
    }: StepRange = stepRangeDetails;
    const resultRangeArray: string[] = [];
    for (let index = startRange; index <= endRange; index += step) {
      resultRangeArray.push(addZero && index < 10 ? `0${index}` : `${index}`);
    }
    return resultRangeArray;
  }

  getCardNetwork(userInput: string): string {
    const userCardNumberInput = userInput.replace(/\s/g, '');
    if (new RegExp(appContants.visaCardRegex).test(userCardNumberInput)) {
      return 'Visa';
    } else if (
      new RegExp(appContants.masterCardRegex).test(userCardNumberInput) ||
      new RegExp(appContants.masterCardRegex2).test(userCardNumberInput)
    ) {
      return 'Mastercard';
    } else if (
      new RegExp(appContants.amexCardRegex).test(userCardNumberInput)
    ) {
      return 'Amex';
    } else {
      return '';
    }
  }
}

import { SharedService } from './../Service/shared-service.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateCardNumber(
  sharedService: SharedService
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!!control.value && !sharedService.getCardNetwork(control.value)) {
      return { invalidCard: true };
    }
    return null;
  };
}

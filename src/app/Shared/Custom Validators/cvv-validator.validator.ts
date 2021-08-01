import { appContants } from './../../Constants/app-constants';
import { AbstractControl } from '@angular/forms';

export function ValidateCvvNumber(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (
    !!control.value &&
    !new RegExp(appContants.cvvRegex).test(control.value)
  ) {
    return { invalidCvv: true };
  }
  return null;
}

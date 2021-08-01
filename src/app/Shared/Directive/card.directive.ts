import { appContants } from './../../Constants/app-constants';
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[card-input]',
})
export class PaymentCardDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const userCardNoInput: string = (
      event.target as HTMLInputElement
    ).value.replace(new RegExp(appContants.avoidAlphabet, 'g'), '');
    if (userCardNoInput.startsWith('34') || userCardNoInput.startsWith('37')) {
      this.elementRef.nativeElement.value = userCardNoInput
        .replace(new RegExp(appContants.amaexCardFormat, 'g'), '$1 $2 $3')
        .trim();
    } else {
      this.elementRef.nativeElement.value = userCardNoInput
        .replace(new RegExp(appContants.spaceAfterFourthCharRegex, 'g'), '$& ')
        .trim();
    }
  }
}

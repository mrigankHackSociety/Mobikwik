import { appContants } from './../../Constants/app-constants';
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[card-input]',
})
export class PaymentCardDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onKeyDown(event: Event) {
    this.elementRef.nativeElement.value = (
      event.target as HTMLInputElement
    ).value
      .replace(new RegExp(appContants.avoidAlphabet, 'g'), '')
      .replace(new RegExp(appContants.spaceAfterFourthCharRegex, 'g'), '$& ')
      .trim();
  }
}

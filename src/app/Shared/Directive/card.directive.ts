import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[card-input]',
})
export class CreditCardDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onKeyDown(event: Event) {
    this.elementRef.nativeElement.value = (
      event.target as HTMLInputElement
    ).value
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }
}

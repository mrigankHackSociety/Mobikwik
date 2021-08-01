import { MaskCardPipe } from './Pipes/mask-card.pipe';
import { PaymentCardDirective } from './Directive/card.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [PaymentCardDirective, MaskCardPipe],
  exports: [PaymentCardDirective, MaskCardPipe],
})
export class SharedModule {}

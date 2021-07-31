import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'maskcard',
})
export class MaskCardPipe implements PipeTransform {
  transform(value: any): any {
    const maskedCardNumber = [...value]
      .map((item, index) => {
        if (index > 4 && index < 12) {
          item = 'X';
        }
        return item;
      })
      .join('');
    return maskedCardNumber;
  }
}

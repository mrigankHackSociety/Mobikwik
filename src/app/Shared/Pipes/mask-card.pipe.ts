import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'maskcard',
})
export class MaskCardPipe implements PipeTransform {
  transform(value: any): any {
    return `${value.substring(0, 4)} ${value
      .substring(4, value.length - 5)
      .replace(/\d/g, 'X')} ${value.substring(value.length - 5)}`;
  }
}

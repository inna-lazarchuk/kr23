import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longText'
})
export class LongTextPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length <= 200) {
      return value;
    } else {
      return  value.slice(0, 200) + '...';
    }
  }

}

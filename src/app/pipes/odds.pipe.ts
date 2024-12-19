import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'odds',
  standalone: true
})
export class OddsPipe implements PipeTransform {

  transform(value: any): any {
    return value ? value : '-';
  }

}

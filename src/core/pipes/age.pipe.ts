import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    const birthDate = new Date(value);

    const today = new Date();
    const monthDiff = today.getMonth() - birthDate.getMonth(); 
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return today.getFullYear() - birthDate.getFullYear() - 1;
    }
    return today.getFullYear()-birthDate.getFullYear();
  }

}

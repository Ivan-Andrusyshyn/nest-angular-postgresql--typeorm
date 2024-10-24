import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe',
  standalone:true
})
export class GenderPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'm':
        return 'Male';
      case 'f':
        return 'Female';
      case 'u':
      default:
        return 'Unspecified';
    }
  }
}

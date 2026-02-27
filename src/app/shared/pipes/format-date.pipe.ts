import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatter } from '../utils';

@Pipe({
  name: 'appFormatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(
    date: Date | string | null,
    format: 'short' | 'long' | 'full' = 'short'
  ): string {
    return DateFormatter.format(date, format);
  }
}

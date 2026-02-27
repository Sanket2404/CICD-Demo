import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter } from '../utils';

@Pipe({
  name: 'appTruncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(text: string | null, length: number = 50): string {
    if (!text) return '';
    return StringFormatter.truncate(text, length);
  }
}

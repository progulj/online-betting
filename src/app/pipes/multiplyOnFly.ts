import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'multiplyOnFly'})
export class MultiplyPipe implements PipeTransform {
  transform(x: number, y: number): number {
    return Math.round(x * y * 100) / 100;
  }
}

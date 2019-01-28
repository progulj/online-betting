import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'estimatedWin'})
export class EstimatedWinPipe implements PipeTransform {
  transform(x: number, y: number, z: number): number {
    return Math.round(z * (y - x * y) * 100) / 100;
  }
}

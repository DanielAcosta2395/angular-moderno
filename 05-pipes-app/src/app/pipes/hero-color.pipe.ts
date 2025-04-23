import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColor',
  standalone: true,
})
export class HeroColorPipe implements PipeTransform {
  transform(value: Color, hex: boolean = false): string {
    if (hex) {
      return ColorMap[value];
    }
    return Color[value];
  }
}

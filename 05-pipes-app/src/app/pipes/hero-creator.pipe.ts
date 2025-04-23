import { Pipe, PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroCreator',
  standalone: true,
})
export class HeroCreatorPipe implements PipeTransform {
  transform(value: Creator): any {
    return Creator[value];
  }
}

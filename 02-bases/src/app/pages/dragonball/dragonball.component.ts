import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dragonball.component.html',
})
export class DragonballComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([{ id: 1, name: 'Goku', power: 9001 }]);

  powerClasses = computed(() => {
    return {
      'text-danger': true,
    };
  });

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) return;

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };

    //this.characters().push(newCharacter);

    this.characters.update((initialCharacters) => [
      ...initialCharacters,
      newCharacter,
    ]);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}

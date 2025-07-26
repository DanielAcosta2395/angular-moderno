import {
  afterNextRender,
  afterRender,
  Component,
  effect,
  signal,
} from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = (...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(',')}`,
    'color: #bada55'
  );
};

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  traditionalProperty = 'Daniel';
  signalProperty = signal('Daniel');

  constructor() {
    log('HomePageComponent constructor called');
  }

  changeTraditionalProperty() {
    this.traditionalProperty = 'Daniel Acosta';
  }

  changeSignalProperty() {
    this.signalProperty.set('Daniel Acosta');
  }

  basicEffect = effect((onCleanup) => {
    log(
      'basicEffect',
      'Runs once after the component is initialized and every time the component is checked for changes.'
    );

    onCleanup(() => {
      log('basicEffect cleanup', 'Runs when the component is destroyed.');
    });
  });

  ngOnInit() {
    log(
      'ngOnInit',
      "Runs once after Angular has initialized all the component's inputs."
    );
  }
  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }
  ngDoCheck() {
    log('ngDoCheck', 'Runs every time this component is checked for changes.');
  }
  ngAfterContentInit() {
    log(
      'ngAfterContentInit',
      "Runs once after the component's content has been initialized."
    );
  }
  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked',
      'Runs every time this component content has been checked for changes.'
    );
  }
  ngAfterViewInit() {
    log(
      'ngAfterViewInit',
      "Runs once after the component's view has been initialized."
    );
  }
  ngAfterViewChecked() {
    log(
      'ngAfterViewChecked',
      "Runs every time the component's view has been checked for changes."
    );
  }
  ngOnDestroy() {
    log('ngOnDestroy', 'Runs once before the component is destroyed.');
  }

  afterNextRender = afterNextRender(() => {
    log(
      'afterNextRender',
      'Runs once after the next rendering cycle is complete.'
    );
  });

  afterRender = afterRender(() => {
    log('afterRender', 'Runs after every rendering cycle is complete.');
  });
}

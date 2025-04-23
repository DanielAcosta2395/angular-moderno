import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "./shared/components/side-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'reactive-forms-app';
}

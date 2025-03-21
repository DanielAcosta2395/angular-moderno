import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from "./country/components/app-footer/app-footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppFooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Country app';
}

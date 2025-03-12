import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuHeaderComponent } from '../../gifs/components/side-menu/side-menu-header/side-menu-header.component';
import { SideMenuOptionsComponent } from '../../gifs/components/side-menu/side-menu-options/side-menu-options.component';
import { SideMenuComponent } from '../../gifs/components/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent {}

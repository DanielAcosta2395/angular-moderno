import { Component, OnInit } from '@angular/core';
import { reactiveRoutes } from '../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent implements OnInit {
  reactiveMenuItems: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      title: `${item.title}`,
      route: `reactive/${item.path}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: './auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Country',
      route: './country',
    },
  ];

  constructor() {}

  ngOnInit() {}
}

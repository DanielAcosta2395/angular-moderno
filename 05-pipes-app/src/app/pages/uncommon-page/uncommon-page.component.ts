import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { I18nPluralPipe, I18nSelectPipe, SlicePipe } from '@angular/common';

const client1 = {
  name: 'Daniel',
  gender: 'male',
  age: 29,
  address: 'SLP, México',
};

const client2 = {
  name: 'Noemi',
  gender: 'female',
  age: 25,
  address: 'SLP, México',
};

@Component({
  selector: 'app-uncommon-page',
  standalone: true,
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  //i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  // i18n Plural
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos dos clientes esperando',
    other: 'tenemos # clientes esperando',
  });

  clients = signal(['Daniel', 'Mimi', 'Michelle', 'Agustin', 'Ximena', 'Luis']);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }
}

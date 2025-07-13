import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  private fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  countryForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanup) => {
    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();

    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChange() {
    return this.countryForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.countryForm.get('country')!.setValue('')),
        tap(() => this.countryForm.get('border')!.setValue('')),
        tap(() => {
          this.countriesByRegion.set([]);
          this.borders.set([]);
        }),
        switchMap((region) => {
          return this.countryService.getCountriesByRegion(region ?? '');
        })
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChange() {
    return this.countryForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.countryForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((countryCode) => {
          return this.countryService.getCountryByCode(countryCode ?? '');
        }),
        switchMap((country) => {
          return this.countryService.getCountryNamesByCodes(country.borders);
        })
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      });
  }
}

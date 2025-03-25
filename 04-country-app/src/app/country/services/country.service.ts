import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      catchError((err) => {
        return throwError(
          () => new Error(`Cannot find capitals with: ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    const url = `${API_URL}/name/${query}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      delay(2000),
      catchError((err) => {
        return throwError(
          () => new Error(`Cannot find countries with: ${query}`)
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    code = code.toLowerCase();

    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      map((countries) => countries.at(0)),
      catchError((err) => {
        return throwError(
          () => new Error(`Cannot find countries with: ${code}`)
        );
      })
    );
  }
}

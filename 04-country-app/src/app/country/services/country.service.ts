import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../types/regions.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();

  private queryCacheCountry = new Map<string, Country[]>();

  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
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

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((err) => {
        return throwError(
          () => new Error(`Cannot find countries with: ${query}`)
        );
      })
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((err) => {
        //console.log(err);
        return throwError(
          () => new Error(`Cannot find countries with: ${region}`)
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

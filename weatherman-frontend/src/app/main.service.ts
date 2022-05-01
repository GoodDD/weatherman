import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { PostData } from './interfaces/PostData';
import { ForecastDay } from './classes/ForecastDay'
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {

  serverUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  loadMap(): Observable<boolean> {
    return this.http.jsonp('https://maps.googleapis.com/maps/api/js?key='+environment.googleApiKey, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );;
  }

  getForecastRapidWeatherApi(data: PostData, sources: any): Observable<ForecastDay[][]> {

    let obs: Observable<ForecastDay[]>[] = [];

    sources.forEach(source => {
      obs.push( this.http.post<ForecastDay[]>(this.serverUrl+source, data) )
    })

    return forkJoin(obs)
      .pipe(
        map(res => {
          console.log(res)
          return res.map(item => {
            console.log(item)
            return item.map(itemc => {
              return new ForecastDay(
                itemc.date,
                itemc.avgtemp_c,
                itemc.totalprecip_mm
              )
            })
          })
        }),
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    return throwError(() => new Error(error));
  }
}

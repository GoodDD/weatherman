import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from './main.service';
import { ForecastDay } from './classes/ForecastDay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ MainService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  apiLoaded: Observable<boolean>;
  title = 'weatherman';

  sharedData$: Observable<ForecastDay[][]>;
  setSharedData(data: Observable<ForecastDay[][]>): Observable<ForecastDay[][]> {
    return this.sharedData$ = data;
  }

  sharedLatLng$: Observable<any>;
  setLatLng(data: Observable<any>): Observable<any> {
    return this.sharedLatLng$ = data;
  }

  sharedSources$: Observable<any[]>;
  setSources(data: Observable<any[]>): Observable<any[]> {
    return this.sharedSources$ = data;
  }

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastDay } from '../classes/ForecastDay';

@Component({
  selector: 'app-table-module',
  templateUrl: './table-module.component.html',
  styleUrls: ['./table-module.component.css']
})
export class TableModuleComponent implements OnInit {

  data: ForecastDay[];

  @Input() sources: Observable<any[]>;
  @Input() items: Observable<ForecastDay[][]>;

  displayedColumns: string[] = ['date', 'avgtemp_c', 'totalprecip_mm'];

  constructor() { }

  ngOnInit(): void {

  }
}

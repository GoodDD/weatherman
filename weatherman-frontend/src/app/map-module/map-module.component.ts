import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-map-module',
  templateUrl: './map-module.component.html',
  providers: [ MainService ],
  styleUrls: ['./map-module.component.css']
})
export class MapModuleComponent implements OnInit {

  apiLoaded: Observable<boolean>;
  mapPoint: google.maps.LatLngLiteral;

  center: google.maps.LatLngLiteral = {
    lat: 59.436962,
    lng: 24.753574
  }

  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  }

  @Output() newLatLngEvent = new EventEmitter<any>();
  addNewLatLng(value: any) {
    this.newLatLngEvent.emit(value);
  }

  constructor(
    private mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.apiLoaded = this.mainService.loadMap();
  }

  getLatLng(event: google.maps.MapMouseEvent) {
    this.mapPoint = { lat: event.latLng!.lat(), lng: event.latLng!.lng() };
    this.addNewLatLng(this.mapPoint);
    console.log(this.mapPoint);
  }
}

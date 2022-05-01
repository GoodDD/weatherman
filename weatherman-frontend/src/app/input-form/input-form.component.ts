import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostData } from '../interfaces/PostData';
import { ForecastDay } from '../classes/ForecastDay'
import { MainService } from '../main.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  providers: [ MainService ],
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  @Output() newSourcesEvent = new EventEmitter<Observable<any>>();
  addNewSources(value: Observable<any>) {
    this.newSourcesEvent.emit(value);
  }

  @Output() newForecastEvent = new EventEmitter<Observable<ForecastDay[][]>>();
  addNewForecast(value: Observable<ForecastDay[][]>) {
    this.newForecastEvent.emit(value);
  }

  @Input() latLng: Observable<google.maps.LatLngLiteral>;


  myForm: FormGroup;

  fd$: Observable<ForecastDay[][]>;

  sources: Array<any> = [
    { value: false, name: 'weatherapi' },
    { value: false, name: 'rapidapi' },
  ]

  constructor(
    private mainService: MainService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      'latitude': [''],
      'longitude': [''],
      'start': [''],
      'end': [''],
      checkArray: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['latLng'].currentValue) {
      this.myForm.controls['latitude'].setValue(changes['latLng'].currentValue.lat);
      this.myForm.controls['longitude'].setValue(changes['latLng'].currentValue.lng);
    }
  }

  onChangeEventFunc(name: string, isChecked) {
    const src = (this.myForm.get('checkArray') as FormArray);

    if (isChecked.checked) {
      src.push(new FormControl(name));
    } else {
      const index = src.controls.findIndex(x => x.value === name);
      src.removeAt(index);
    }
  }

  onSubmit(form: FormGroup) {

    let postData: PostData = {
      latitude: form.value.latitude,
      longitude: form.value.longitude,
      range: this.daysRangeCalc(form.value.start, form.value.end)
    };

    let sources = form.value.checkArray;
    this.addNewSources(sources);
    this.getForecast(postData, sources);
  }

  getForecast(data: PostData, sources: any) {
    this.fd$ = this.mainService.getForecastRapidWeatherApi(data, sources);
  }

  daysRangeCalc(start: number, end: number): number {
    let range = end - start;
    let daysRange = range / (1000 * 3600 * 24);
    return daysRange + 1;
  }
}

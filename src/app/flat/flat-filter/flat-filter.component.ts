import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Options} from 'ng5-slider';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {SearchParameters} from './entity/SearchParameters';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {BASE_URL} from 'src/app/utils/constants';
import {FlatService} from '../../services/flat.service';

@Component({
  selector: 'app-flat-filter',
  templateUrl: './flat-filter.component.html',
  styleUrls: ['./flat-filter.component.scss']
})

export class FlatFilterComponent implements OnInit {

  constructor(private http: HttpClient, private flatService: FlatService) {
  }

  priceOptions: Options = {
    floor: 0,
    ceil: 40000
  };
  floorOptions: Options = {
    floor: 0,
    ceil: 16
  };
  roomOptions: Options = {
    floor: 0,
    ceil: 12
  };

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = [];

  tags: string[] = [];
  regions: Array<string> = [];

  minPrice = 0;
  maxPrice = 500;

  minNumberOfRooms = 0;
  maxNumberOfRooms = 3;

  minFloor = 0;
  maxFloor = 4;

  @Input() private parameters: SearchParameters = new SearchParameters();
  @Output() loadFlats = new EventEmitter<any>();

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  setRegions(event, value: string) {
    if (event.checked) {
      this.regions.push(value);
    } else {
      this.regions = this.regions.filter(x => !(x.match(value)));
    }
  }

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    this.http.get(BASE_URL + 'tag').subscribe((data: string[]) => {
      console.log(data);
      this.allTags = data;
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags));
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  filterFlats() {
    this.parameters.regions = this.regions;
    this.parameters.tags = this.tags;
    this.parameters.minNumberOfRooms = this.minNumberOfRooms;
    this.parameters.maxNumberOfRooms = this.maxNumberOfRooms;
    this.parameters.priceLow = this.minPrice;
    this.parameters.priceHigh = this.maxPrice;
    this.parameters.floorLow = this.minFloor;
    this.parameters.floorHigh = this.maxFloor;
  }

  showByFilter() {
    this.filterFlats();
    this.loadFlats.emit();
  }

  subscribeFlats() {
    this.filterFlats();
    this.http.post(BASE_URL + 'subscribe', JSON.stringify(this.parameters), this.options)
      .subscribe(success => {
        this.flatService.openSnackBar('Succesfuly subscribed to notifications', 'Subscribed');
      }, error => {
        this.flatService.openSnackBar('You can not subscribe', 'Error');
      });
  }

  unSubscribe() {
    this.http.delete(BASE_URL + 'subscribe')
      .subscribe(success => {
        this.flatService.openSnackBar('Succesfuly unsubscribed from all notifications', 'Unsubscribed');
      });
  }
}



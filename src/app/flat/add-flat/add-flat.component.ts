import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from 'src/app/utils/constants';
import {NewFlat} from './entity/new-flat';

@Component({
  selector: 'app-add-flat',
  templateUrl: './add-flat.component.html',
  styleUrls: ['./add-flat.component.scss']
})
export class AddFlatComponent implements OnInit {

  imgURL: any;
  public message: string;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = [];
  error: any = 0;
  success: any = 0;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  public flat: NewFlat = new NewFlat();

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadTags();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.flat.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.flat.tags.indexOf(fruit);
    if (index >= 0) {
      this.flat.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.flat.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (events) => {
          console.log(events.target.result);
          this.flat.base64Photos.push(events.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  publicate() {
    console.log(JSON.stringify(this.flat));
    this.http.post(BASE_URL + 'flat/create', JSON.stringify(this.flat), this.options)
      .subscribe(success => {
        console.log(success);
        this.success = success;
      }, error => { // second parameter is to listen for error
        console.log(error);
        this.error = error;
      });
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SearchParameters} from '../flat-filter/entity/SearchParameters';
import {FlatResponse} from '../flat-filter/entity/Flat';
import {BASE_URL} from 'src/app/utils/constants';
import {FlatService} from '../../services/flat.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.scss']
})
export class FlatListComponent implements OnInit {

  constructor(private http: HttpClient, public flatService: FlatService,
              private bar: MatSnackBar) {
  }

  @Input() userId: number;
  pageNumber = 0;
  data: any;
  flats: FlatResponse;
  favoriteData: any;
  favoriteFlats: FlatResponse = new FlatResponse();
  parameters: SearchParameters = new SearchParameters();

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  ngOnInit() {
    this.loadFlats();
    this.loadFavoriteFlats();
  }

  loadFlats() {
    this.pageNumber = 0;
    this.http.put(BASE_URL + 'flat/search/' + this.pageNumber, JSON.stringify(this.parameters), this.options)
      .subscribe(data => {
        this.data = data;
        this.flats = this.data;
      });
  }

  onScroll() {
    this.pageNumber = this.pageNumber + 1;
    console.log(this.pageNumber);
    this.loadNextPost();
  }

  loadNextPost() {
    this.http.put(BASE_URL + 'flat/search/' + this.pageNumber, JSON.stringify(this.parameters), this.options).subscribe(data => {
      this.data = data;
      this.flats.content = this.flats.content.concat(this.data.content);
    });
  }

  getUsername() {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      return JSON.parse(localStorage.getItem('user')).username;
    }
  }

  removeFlat(flatId: number) {
    this.http.delete(BASE_URL + 'flat/' + flatId).subscribe(success => {
      this.flatService.openSnackBar('Successfully deactivated', 'Removed');
    });
  }

  loadFavoriteFlats() {
    this.http.get(BASE_URL + 'favorite/getFlats').subscribe(data => {
        this.favoriteData = data;
        this.favoriteFlats.content = this.favoriteData;
      }
    )
  }

  addToFavoriteList(id: number) {
    this.flatService.addFlatToFavoriteList(id).subscribe(success => {
        this.bar.open("Flat was added to Favorite List", "x",
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
        this.loadFavoriteFlats();
      },
      error => {
        this.bar.open(error.error.message, "x",
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      }
    );

  }

  isFavorite(id: number) {
    if (this.favoriteFlats.content === undefined) {
      return false;
    }
    return this.favoriteFlats.content.filter(value => {
      return value.id == id;
    }).length > 0;
  }

  deleteFlat(id: number) {
    this.flatService.removeFlatFromFavoriteList(id).subscribe(success => {
        this.loadFavoriteFlats();
        this.bar.open("Flat was deleted from Favorite List", "x",
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      },
      error => {
        this.bar.open(error.error.message, "x",
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      }
    );
  }
}




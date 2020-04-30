import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FlatResponse} from '../flat-filter/entity/Flat';
import {SearchParameters} from '../flat-filter/entity/SearchParameters';
import {BASE_URL} from 'src/app/utils/constants';
import {FlatService} from '../../services/flat.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-landlord-flat-list',
  templateUrl: './landlord-flat-list.component.html',
  styleUrls: ['./landlord-flat-list.component.scss']
})
export class LandlordFlatListComponent implements OnInit {

  constructor(private http: HttpClient, private flatService: FlatService, private bar: MatSnackBar) {
  }

  @Input() userId: number;
  pageNumber = 0;
  data: any;
  flatResponse: FlatResponse = new FlatResponse();
  favoriteData: any;
  favoriteFlats: FlatResponse = new FlatResponse();

  ngOnInit() {
    if (this.getUsername() != null) {
      this.loadFavoriteFlats();
    }

    this.loadFlats();
  }

  loadFlats() {
    this.pageNumber = 0;
    const url = BASE_URL + 'flat/userflat/' + this.userId;
    console.log(url);
    this.http.get(url)
      .subscribe(data => {
        this.data = data;
        console.log(data);
        this.flatResponse.content = this.data;
      });
  }

  getUsername() {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      return JSON.parse(localStorage.getItem('user')).username;
    }
  }

  removeFlat(flatId: number) {
    this.http.delete(BASE_URL + 'flat/' + flatId).subscribe(success => {
      this.flatService.openSnackBar('Succesfuly deactivated', 'Removed');
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

  getUserRole() {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      return JSON.parse(localStorage.getItem('user')).role;
    }
  }

}

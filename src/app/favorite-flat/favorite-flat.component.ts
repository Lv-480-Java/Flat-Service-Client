import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlatResponse} from "../flat/flat-filter/entity/Flat";
import {FlatService} from "../services/flat.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-favorite-flat',
  templateUrl: './favorite-flat.component.html',
  styleUrls: ['./favorite-flat.component.scss']
})
export class FavoriteFlatComponent implements OnInit {

  constructor(private http: HttpClient, private flatService: FlatService,
              private bar: MatSnackBar) {
  }

  data: any;
  flatResponse: FlatResponse = new FlatResponse();

  ngOnInit() {
    this.loadFlats();
  }

  loadFlats() {
    this.flatService.getFavoriteFlats()
      .subscribe(data => {
        this.data = data;
        this.flatResponse.content = this.data;
        if (this.flatResponse.content.length < 1) {
          this.bar.open("Your favorite list is empty", "x",
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar']
            });
        }
      });
  }

  deleteFlat(id: number) {
    this.flatService.removeFlatFromFavoriteList(id).subscribe(success => {
        this.loadFlats();
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

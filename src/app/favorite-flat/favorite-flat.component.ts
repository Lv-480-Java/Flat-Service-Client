import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlatResponse} from "../flat/flat-filter/entity/Flat";
import {FlatService} from "../services/flat.service";

@Component({
  selector: 'app-favorite-flat',
  templateUrl: './favorite-flat.component.html',
  styleUrls: ['./favorite-flat.component.scss']
})
export class FavoriteFlatComponent implements OnInit {

  constructor(private http: HttpClient, private flatService: FlatService) {
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
        console.log(data);
        this.flatResponse.content = this.data;
      });
  }

  deleteFlat(id: number) {
    this.flatService.removeFlatFromFavoriteList(id).subscribe(success => {
      this.flatResponse.content = this.flatResponse.content.filter(function (value) {
        return value.id !== id;
      })
    });
  }

}

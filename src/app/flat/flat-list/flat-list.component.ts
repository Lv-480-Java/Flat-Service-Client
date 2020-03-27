import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SearchParameters} from '../flat-filter/entity/SearchParameters';
import {FlatResponse} from '../flat-filter/entity/Flat';
import {BASE_URL} from 'src/app/utils/constants';
import {FlatService} from "../../services/flat.service";

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.scss']
})
export class FlatListComponent implements OnInit {

  constructor(private http: HttpClient, private flatService: FlatService) {
  }
  @Input() userId: number;
  pageNumber = 0;
  data: any;
  flats: FlatResponse;
  parameters: SearchParameters = new SearchParameters();

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  ngOnInit() {
    this.loadFlats();
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

  addToFavoriteList(id: number) {
    console.log(id);
    console.log("Component is running..");
    this.flatService.addFlatToFavoriteList(id).subscribe();
  }
}




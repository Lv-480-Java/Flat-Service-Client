import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FlatResponse} from '../flat-filter/entity/Flat';
import {SearchParameters} from '../flat-filter/entity/SearchParameters';
import {BASE_URL} from 'src/app/utils/constants';
import {FlatService} from '../../services/flat.service';

@Component({
  selector: 'app-landlord-flat-list',
  templateUrl: './landlord-flat-list.component.html',
  styleUrls: ['./landlord-flat-list.component.scss']
})
export class LandlordFlatListComponent implements OnInit {

  constructor(private http: HttpClient, private flatService: FlatService) {
  }

  @Input() userId: number;
  pageNumber = 0;
  data: any;
  flatResponse: FlatResponse = new FlatResponse();

  ngOnInit() {
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

}

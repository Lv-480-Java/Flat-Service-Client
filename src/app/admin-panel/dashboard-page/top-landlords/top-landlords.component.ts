import {Component, OnInit} from '@angular/core';
import {User} from '../../component/Users';
import {StatisticsService} from '../../../services/statistics.service';

@Component({
  selector: 'app-top-landlords',
  templateUrl: './top-landlords.component.html',
  styleUrls: ['./top-landlords.component.scss']
})
export class TopLandlordsComponent implements OnInit {

  commtments = [8, 7, 4, 4, 3, 2];
  topLandlords: Array<User>;
  data = new Array();

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.getTopLandlords(6).subscribe(landlords => {
      this.topLandlords = landlords;
      for (let i = 0; i < 6; i++) {
        this.data.push({landlord: this.topLandlords[i], flats: 0, commitments: this.commtments[i]});
      }
      console.log('load flats');
      for (let i = 0; i < 6; i++) {
        const id = this.topLandlords[i].id;
        this.statisticsService.getFlatsOfLandlord(id).subscribe(count => {
          this.data[i].flats = count;
        });
      }
    });
  }

}

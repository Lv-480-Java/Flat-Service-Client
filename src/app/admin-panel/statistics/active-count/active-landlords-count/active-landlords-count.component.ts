import {Component, OnInit} from '@angular/core';
import {UserStatisticsService} from '../../../../services/statistics/user-statistics.service';

@Component({
  selector: 'app-active-landlords-count',
  templateUrl: './active-landlords-count.component.html',
  styleUrls: ['./active-landlords-count.component.scss']
})
export class ActiveLandlordsCountComponent implements OnInit {

  countLandlord: number;

  constructor(private statisticsService: UserStatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.countActiveLandlords().subscribe(count => {
      this.countLandlord = count;
    });
  }
}

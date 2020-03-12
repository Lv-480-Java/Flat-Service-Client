import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {StatisticsService} from '../../../services/statistics.service';

@Component({
  selector: 'app-active-count',
  templateUrl: './active-count.component.html',
  styleUrls: ['./active-count.component.scss']
})
export class ActiveCountComponent implements OnInit {

  countFlats: number;
  countUsers: number;
  countLandlord: number;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.statisticsService.countActiveFlats().subscribe(count => {
      this.countFlats = count;
    });
    this.statisticsService.countActiveUsers().subscribe(count => {
      this.countUsers = count;
    });
    this.statisticsService.countActiveLandlords().subscribe(count => {
      this.countLandlord = count;
    });
  }
}

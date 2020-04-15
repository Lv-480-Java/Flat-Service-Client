import {Component, OnInit} from '@angular/core';
import {UserStatisticsService} from '../../../../services/statistics/user-statistics.service';

@Component({
  selector: 'app-active-users-count',
  templateUrl: './active-users-count.component.html',
  styleUrls: ['./active-users-count.component.scss']
})
export class ActiveUsersCountComponent implements OnInit {

  countUsers: number;

  constructor(private statisticsService: UserStatisticsService) {
  }
  ngOnInit(): void {
    this.statisticsService.countActiveUsers().subscribe(count => {
      this.countUsers = count;
    });
  }

}

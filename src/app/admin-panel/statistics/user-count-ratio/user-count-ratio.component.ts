import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {UserStatisticsService} from '../../../services/statistics/user-statistics.service';

@Component({
  selector: 'app-user-count-ratio',
  templateUrl: './user-count-ratio.component.html',
  styleUrls: ['./user-count-ratio.component.scss']
})
export class UserCountRatioComponent implements OnInit {

  userNumber: number;
  userRatio: number;

  private today: Date;
  private weekAgo: Date;
  private twoWeeksAgo: Date;

  constructor(
    private userStatisticsService: UserStatisticsService) {
  }

  ngOnInit(): void {
    this.setDates();
    this.countFlatPostedForWeek();
  }

  setDates() {
    this.today = new Date();
    this.weekAgo = new Date();
    this.twoWeeksAgo = new Date();

    this.weekAgo.setDate(this.today.getDate() - 6);
    this.twoWeeksAgo.setDate(this.today.getDate() - 13);
    this.today.setDate(this.today.getDate() + 1);
  }

  countFlatPostedForWeek() {
    forkJoin([
      this.userStatisticsService.countUsersRegisteredBetween(this.weekAgo, this.today),
      this.userStatisticsService.countUsersRegisteredBetween(this.twoWeeksAgo, this.weekAgo)
    ]).subscribe((count) => {
      this.userNumber = count[0];
      this.userRatio = count[1] / count[0];
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {StatisticsService} from '../../../services/statistics.service';
import {on} from 'cluster';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss']
})
export class DashboardStatsComponent implements OnInit {
  flatNumber: number;
  flatRatio: number;
  commentNumber: number;
  commentRatio: number;
  orderNumber: number;
  orderRatio: number;
  private today: Date;
  private weekAgo: Date;
  private twoWeeksAgo: Date;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.setDates();
    this.countFlatPostedForWeek();
    this.countCommentsPostedForWeek();
    this.countOrdersForWeek();
  }

  setDates() {
    this.today = new Date();
    this.weekAgo = new Date();
    this.twoWeeksAgo = new Date();

    this.weekAgo.setDate(this.today.getDate() - 7);
    this.twoWeeksAgo.setDate(this.today.getDate() - 14);
  }

  countFlatPostedForWeek() {
    forkJoin([
      this.statisticsService.countFlatsPostedBetween(this.weekAgo, this.today),
      this.statisticsService.countFlatsPostedBetween(this.twoWeeksAgo, this.weekAgo)
    ]).subscribe((count) => {
      this.flatNumber = count[0];
      this.flatRatio = count[1] / count[0];
    });
  }

  countCommentsPostedForWeek() {
    forkJoin([
      this.statisticsService.countCommentsPostedBetween(this.weekAgo, this.today),
      this.statisticsService.countCommentsPostedBetween(this.twoWeeksAgo, this.weekAgo)
    ]).subscribe((count) => {
      this.commentNumber = count[0];
      this.commentRatio = count[1] / count[0];
    });
  }

  countOrdersForWeek() {
  }

}

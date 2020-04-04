import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {StatisticsService} from '../../../services/statistics.service';
import {on} from 'cluster';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss']
})
export class DashboardStatsComponent implements OnInit {
  numberOfFlats: number;
  percentageDifferenceFlats: number;
  numberOfComments: number;
  percentageDifferenceComments: number;
  numberOfOrders: number;
  percentageDifferenceOrders: number;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(now.getDate() - 14);
    this.getCountOfFlatsPostedForWeek(now, oneWeekAgo, twoWeeksAgo);
    this.getCountOfCommentsPostedForWeek(now, oneWeekAgo, twoWeeksAgo);
  }

  getCountOfFlatsPostedForWeek(now, oneWeekAgo, twoWeeksAgo) {
    this.statisticsService.getCountOfFlatsPostedBetween(oneWeekAgo, now).subscribe(flatsForThisWeek => {
      this.statisticsService.getCountOfFlatsPostedBetween(twoWeeksAgo, oneWeekAgo).subscribe(flatsForPerevWeek => {
        this.numberOfFlats = flatsForThisWeek;
        if (flatsForPerevWeek === 0) {
          this.percentageDifferenceFlats = 100;
        } else {
          this.percentageDifferenceFlats = (flatsForThisWeek - flatsForPerevWeek) / flatsForPerevWeek * 100;
        }
      });
    });
  }

  getCountOfCommentsPostedForWeek(now, oneWeekAgo, twoWeeksAgo) {
    this.statisticsService.getCountOfPostedCommentsBetween(oneWeekAgo, now).subscribe(flatsForThisWeek => {
      this.statisticsService.getCountOfPostedCommentsBetween(twoWeeksAgo, oneWeekAgo).subscribe(flatsForPerevWeek => {
        this.numberOfComments = flatsForThisWeek;
        if (flatsForPerevWeek === 0) {
          this.percentageDifferenceComments = 100;
        } else {
          this.percentageDifferenceComments = (flatsForThisWeek - flatsForPerevWeek) / flatsForPerevWeek * 100;
        }
        console.log(this.numberOfComments, this.percentageDifferenceComments);
      });
    });
  }

}




import {Component, OnInit} from '@angular/core';
import {FlatStatisticsService} from '../../../services/statistics/flat-statistics.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-flat-count-ratio',
  templateUrl: './flat-count-ratio.component.html',
  styleUrls: ['./flat-count-ratio.component.scss']
})
export class FlatCountRatioComponent implements OnInit {
  flatNumber: number;
  flatRatio: number;

  private today: Date;
  private weekAgo: Date;
  private twoWeeksAgo: Date;

  constructor(
    private flatStatisticsService: FlatStatisticsService) {
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
      this.flatStatisticsService.countFlatsPostedBetween(this.weekAgo, this.today),
      this.flatStatisticsService.countFlatsPostedBetween(this.twoWeeksAgo, this.weekAgo)
    ]).subscribe((count) => {
      this.flatNumber = count[0];
      this.flatRatio = count[1] / count[0];
    });
  }

}

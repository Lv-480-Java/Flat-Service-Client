import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/interval';
import {forkJoin} from 'rxjs';
import {UserStatisticsService} from '../../../services/statistics/user-statistics.service';

@Component({
  selector: 'app-users-line-chart',
  templateUrl: './users-line-chart.component.html',
  styleUrls: ['./users-line-chart.component.scss']
})
export class UsersLineChartComponent implements OnInit {
  public chartType = 'line';

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  fromMonth: Date;
  toMonth: Date;
  maxDate: Date;
  dates = [];

  public chartDatasets = [
    {data: [], label: 'Renters'},
    {data: [], label: 'Landlords'}
  ];

  public chartLabels = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private statisticsService: UserStatisticsService) {
  }

  ngOnInit(): void {
    this.initializeDates();
    this.loadData();
  }

  loadData() {
    this.createDates();
    this.updateDates();
    this.updateDataset();
  }

  updateDataset() {
    const renters = [];
    const landlords = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dates.length; i++) {
      const month = this.dates[i];
      forkJoin([
        this.statisticsService.countRegisteredRentersBeforeMonth(month),
        this.statisticsService.countRegisteredLandlordsBeforeMonth(month)
      ]).subscribe((count) => {
        renters.unshift(count[0]);
        landlords.unshift(count[1]);
        this.chartDatasets = [
          {data: renters, label: 'Renters'},
          {data: landlords, label: 'Landlords'}
        ];
      });
    }
    console.log(this.chartDatasets);
  }

  initializeDates() {
    this.toMonth = new Date();
    this.fromMonth = new Date();
    this.fromMonth.setMonth(this.toMonth.getMonth() - 6);
    this.maxDate = new Date();
  }

  createDates() {
    this.dates = [];
    this.fromMonth = new Date(this.fromMonth);
    this.toMonth = new Date(this.toMonth);
    for (const i = new Date(this.toMonth); this.monthDiff(this.fromMonth, i) !== -2; i.setMonth(i.getMonth() - 1)) {
      this.dates.push(new Date(i));
    }
  }

  updateDates() {
    this.chartLabels = [];
    for (let i = 0; i < this.dates.length; i++) {
      const day = this.dates[i];
      console.log('day', day);
      this.chartLabels[i] = this.monthNames[day.getMonth()];
    }
    this.chartLabels.reverse();
  }

  monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months;
  }
}


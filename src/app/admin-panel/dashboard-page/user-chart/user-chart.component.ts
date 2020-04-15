import {Component, OnInit} from '@angular/core';
import {UserStatisticsService} from '../../../services/statistics/user-statistics.service';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss']
})
export class UserChartComponent implements OnInit {
  private dayNames: Array<any> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private dates = [];
  public totalUsers: number;

  public chartType = 'bar';
  public chartDatasets = [{data: [], label: ''}];
  public chartLabels = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
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
    this.updateDates();
    this.updateDataset();
  }

  initializeDates() {
    const day = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(day);
      this.dates.push(date);
      day.setDate(day.getDate() - 1);
    }
  }

  updateDates() {
    for (let i = 0; i < 7; i++) {
      const day = this.dates[i];
      this.chartLabels[i] = this.dayNames[day.getDay()];
    }
    this.chartLabels.reverse();
  }

  updateDataset() {
    const numbers = [];
    for (let i = 0; i < 7; i++) {
      const day = this.dates[i];
      this.statisticsService.countRegisteredUsersByDay(day).subscribe(countOfRegisteredUsers => {
        numbers.unshift(countOfRegisteredUsers);
        this.chartDatasets = [{data: numbers, label: 'Users registered'}];
        this.totalUsers = numbers.reduce((x, y) => x + y);
      });
    }
  }

}

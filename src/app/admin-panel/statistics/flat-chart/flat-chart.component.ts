import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../../services/statistics.service';

@Component({
  selector: 'app-flat-chart',
  templateUrl: './flat-chart.component.html',
  styleUrls: ['./flat-chart.component.scss']
})
export class FlatChartComponent implements OnInit {
  private dayNames: Array<any> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private dates = [];

  public chartType = 'bar';
  public chartDatasets = [{data: [], label: ''}];
  public chartLabels = [];
  public totalFlats: number;
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private statisticsService: StatisticsService) {
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
      this.statisticsService.countPostedFlatsByDay(day).subscribe(countOfRegisteredUsers => {
        numbers.unshift(countOfRegisteredUsers);
        this.chartDatasets = [{data: numbers, label: 'Flats posted'}];
        this.totalFlats = numbers.reduce((x, y) => x + y);
      });
    }
  }

}

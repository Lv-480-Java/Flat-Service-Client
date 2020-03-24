import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {StatisticsService} from '../../../services/statistics.service';

@Component({
  selector: 'app-flat-chart',
  templateUrl: './flat-chart.component.html',
  styleUrls: ['./flat-chart.component.scss']
})
export class FlatChartComponent implements OnInit {

  public chartType = 'bar';
  public chartDatasets: Array<any>;
  public totalFlats: number;
  public chartLabels: Array<any>;
  private days: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  numberOfDays = 7;


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

  shiftDays() {
    for (let i = 1; i < new Date().getDay() + 1; i++) {
      this.days.push(this.days.shift());
    }
    this.chartLabels = this.days;
  }

  ngOnInit(): void {
    this.statisticsService.getCreatedFlatsForWeek(this.numberOfDays).subscribe(d => {
      this.chartDatasets = [
        {data: d, label: 'Flats posted'}
      ];
      this.totalFlats = d.reduce((a, b) => a + b);
      this.shiftDays();
    });
  }
}

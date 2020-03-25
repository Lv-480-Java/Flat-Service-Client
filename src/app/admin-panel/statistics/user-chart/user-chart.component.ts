import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {StatisticsService} from '../../../services/statistics.service';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss']
})
export class UserChartComponent implements OnInit {

  public chartType = 'bar';

  public chartDatasets: Array<any>;
  public totalUsers: number;
  public chartLabels: Array<any>;
  private days: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  numberOfDays = 7;
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

  constructor(private statisticsService: StatisticsService) {
  }


  shiftDays() {
    for (let i = 1; i < new Date().getDay() + 1; i++) {
      this.days.push(this.days.shift());
    }
    this.chartLabels = this.days;
  }

  updateDataset() {
    this.statisticsService.getRegisteredUsersForWeek(this.numberOfDays).subscribe(usersRegistered => {
      this.chartDatasets = [
        {data: usersRegistered, label: 'Users registered'}
      ];
      this.totalUsers = usersRegistered.reduce((a, b) => a + b);
      this.shiftDays();
      console.log('hello');
    });
  }

  ngOnInit(): void {
    this.updateDataset();
  }


}

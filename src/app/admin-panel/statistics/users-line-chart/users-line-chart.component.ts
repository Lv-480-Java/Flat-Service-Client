import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/interval';
import {StatisticsService} from '../../../services/statistics.service';

@Component({
  selector: 'app-users-line-chart',
  templateUrl: './users-line-chart.component.html',
  styleUrls: ['./users-line-chart.component.scss']
})
export class UsersLineChartComponent implements OnInit {
  public chartType = 'line';

  fromMonth: Date;
  toMonth: Date;
  maxDate: Date;

  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;

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

  constructor(private statisticsService: StatisticsService) {
  }

  updateDataset() {
    const from = new Date(this.fromMonth).toISOString().substr(0, 7);
    const to = new Date(this.toMonth).toISOString().substr(0, 7);

    this.statisticsService.getAllUsersCount(from, to).subscribe(userCount => {
      this.statisticsService.getAllLandlordsCount(from, to).subscribe(landlordCount => {
        this.statisticsService.getMonthNames(from, to).subscribe(months => {
          this.chartDatasets = [
            {data: userCount, label: 'Users'},
            {data: landlordCount, label: 'Landlords'}
          ];
          this.chartLabels = months;
        });
      });
    });
  }


  ngOnInit(): void {
    this.fromMonth = new Date();
    this.toMonth = new Date(new Date().setMonth(new Date().getMonth() - 6));
    this.maxDate = new Date();
    this.updateDataset();
  }
}

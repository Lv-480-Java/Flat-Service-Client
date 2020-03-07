import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users-line-chart',
  templateUrl: './users-line-chart.component.html',
  styleUrls: ['./users-line-chart.component.scss']
})
export class UsersLineChartComponent implements OnInit {


  public chartType: string = 'line';

  uSub: Subscription;
  aSub: Subscription;


  public chartDatasets: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset'}
  ];
  public chartLabels: Array<any> = ['September', 'October', 'November', 'December', 'January', 'February', 'March'];

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

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.uSub = this.adminService.getAllUsersCount().subscribe(d => {
      this.aSub = this.adminService.getAllLandlordsCount().subscribe(b => {
        console.log(d);
        console.log(d);

        this.chartDatasets.shift();
        this.chartDatasets = [
          {data: d, label: 'Users'},
          {data: b, label: 'Landlords'}
        ];

      });
    });
  }
}

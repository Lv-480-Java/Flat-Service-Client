import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {DatePipe} from '@angular/common';
import 'rxjs/add/observable/interval';

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

  updateDataset() {
    const from = new Date(this.fromMonth).toISOString().substr(0, 7);
    const to = new Date(this.toMonth).toISOString().substr(0, 7);

    this.adminService.getAllUsersCount(from, to).subscribe(d => {
      this.adminService.getAllLandlordsCount(from, to).subscribe(b => {
        this.adminService.getMonthNames(from, to).subscribe(l => {

          console.log(d);
          console.log(b);
          console.log(l);

          this.chartDatasets = [
            {data: d, label: 'Users'},
            {data: b, label: 'Landlords'}
          ];
          this.chartLabels = l;
          console.log('changed');
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

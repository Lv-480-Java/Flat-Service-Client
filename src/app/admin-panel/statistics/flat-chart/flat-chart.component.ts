import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-flat-chart',
  templateUrl: './flat-chart.component.html',
  styleUrls: ['./flat-chart.component.scss']
})
export class FlatChartComponent implements OnInit {

  public chartType: string = 'bar';

  public chartDatasets: Array<any>;

  public totalUsers: number;


  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']; // dates

  private days: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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


  uSub: Subscription;

  constructor(private adminService: AdminService) {
  }

  i: number;

  shiftDays() {
    for (this.i = 1; this.i < new Date().getDay() + 1; this.i++) {
      this.days.push(this.days.shift());
    }
    this.chartLabels = this.days;
  }

  ngOnInit(): void {
    this.uSub = this.adminService.getCreatedFlats().subscribe(d => {
      this.chartDatasets = [
        {data: d, label: 'Flats posted'}
      ];
      console.log(d);
      this.totalUsers = d.reduce((a, b) => a + b);
      this.shiftDays();
    });
  }
}

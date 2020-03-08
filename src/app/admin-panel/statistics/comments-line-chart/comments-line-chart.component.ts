import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminService} from '../../../services/admin.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-comments-line-chart',
  templateUrl: './comments-line-chart.component.html',
  styleUrls: ['./comments-line-chart.component.scss']
})
export class CommentsLineChartComponent implements OnInit {

  public chartType = 'line';

  uc: Array<number>;
  fc: Array<number>;


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
    responsive: true,
  };

  constructor(private adminService: AdminService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Array<number>>('http://localhost:8080/admin/statistics/user-comments-dynamics').subscribe(d => {
      this.http.get<Array<number>>('http://localhost:8080/admin/statistics/flat-comments-dynamics').subscribe(b => {
        console.log('comments');
        console.log(d);
        console.log(b);

        this.chartDatasets = [
          {data: b, label: 'User Comments'},
          {data: d, label: 'Flat Comments'},
          {data: d, label: 'Flat Comments'}

        ];

        console.log(this.chartDatasets);

        // this.chartDatasets = [
        //   {data: [2, 59, 80, 81, 56, 55, 2], label: 'My First dataset'},
        //   {data: [2, 48, 40, 19, 86, 27, 2], label: 'My Second dataset'}
        // ];


      });
    });
  }

}

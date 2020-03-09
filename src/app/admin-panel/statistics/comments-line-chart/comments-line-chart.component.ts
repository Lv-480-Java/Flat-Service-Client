import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-comments-line-chart',
  templateUrl: './comments-line-chart.component.html',
  styleUrls: ['./comments-line-chart.component.scss']
})
export class CommentsLineChartComponent implements OnInit {

  public chartType = 'line';
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  private days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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

  constructor(private http: HttpClient) {
  }

  shiftDays() {
    for (let i = 1; i < new Date().getDay() + 1; i++) {
      this.days.push(this.days.shift());
    }
    this.chartLabels = this.days;
  }

  updateData() {
    this.http.get<Array<number>>('http://localhost:8080/admin/statistics/user-comments-dynamics/7').subscribe(userCommnts => {
      this.http.get<Array<number>>('http://localhost:8080/admin/statistics/flat-comments-dynamics/7').subscribe(flatCommnet => {
        this.chartDatasets = [
          {data: userCommnts, label: 'User Comments'},
          {data: flatCommnet, label: 'Flat Comments'},
        ];
        this.shiftDays();
      });
    });
  }

  ngOnInit(): void {
    this.updateData();
  }

}
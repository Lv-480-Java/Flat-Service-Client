import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {StatisticsService} from '../../../services/statistics.service';

@Component({
  selector: 'app-diagram-comments',
  templateUrl: './diagram-comments.component.html',
  styleUrls: ['./diagram-comments.component.scss']
})
export class DiagramCommentsComponent implements OnInit {

  public chartType = 'pie';
  public chartDatasets: Array<any> = [{data: [0, 0]}];
  public chartLabels: Array<any> = ['Flats', 'Users'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#2d5569', '#bccb6e'],
      hoverBackgroundColor: ['#3a859d', '#e6f595'],
      borderWidth: 1,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.getCommentsData().subscribe(data => {
      // this.chartDatasets = data;
      this.chartDatasets = [72, 39];
    });
  }


}

import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {CommentStatitsticsService} from '../../../services/statistics/comment-statitstics.service';

@Component({
  selector: 'app-diagram-comments',
  templateUrl: './diagram-comments.component.html',
  styleUrls: ['./diagram-comments.component.scss']
})
export class DiagramCommentsComponent implements OnInit {
  public chartType = 'pie';
  public chartDatasets: Array<any> = [{data: [0, 0]}];
  public chartLabels: Array<any> = ['Active', 'Unactive'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#4183fa', '#9c9595'],
      hoverBackgroundColor: ['#65a0fa', '#dcd9d7'],
      borderWidth: 1,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private statisticsService: CommentStatitsticsService) {
  }

  ngOnInit(): void {
    this.loadDataset();
  }

  loadDataset() {
    forkJoin([
      this.statisticsService.countFlatCommnets(),
      this.statisticsService.countUserCommnets()
    ]).subscribe((count) => {
      console.log('comments', count);
      this.chartDatasets = [{data: count}];
    });
  }

}

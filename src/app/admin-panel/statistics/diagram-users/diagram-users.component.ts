import {Component, OnInit} from '@angular/core';
import {UserStatisticsService} from '../../../services/statistics/user-statistics.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-diagram-users',
  templateUrl: './diagram-users.component.html',
  styleUrls: ['./diagram-users.component.scss']
})
export class DiagramUsersComponent implements OnInit {

  public chartType = 'pie';

  public chartDatasets: Array<any> = [{data: [0, 0, 0]}];
  public chartLabels: Array<any> = ['Renters', 'Landlords', 'Moderators'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#75c942', '#e65a72', '#e6cc31'],
      hoverBackgroundColor: ['#b7fa88', '#e67d83', '#e6e156'],
      borderWidth: 1,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };

  constructor(private statisticsService: UserStatisticsService) {
  }

  ngOnInit(): void {
    this.loadDataset();
  }

  loadDataset() {
    forkJoin([
      this.statisticsService.countActiveRenters(),
      this.statisticsService.countActiveLandlords(),
      this.statisticsService.countActiveModerators()
    ]).subscribe((count) => {
      this.chartDatasets = [{data: count}];
    });
  }
}

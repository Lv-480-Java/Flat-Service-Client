import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';
import {StatisticsService} from '../../../services/statistics.service';

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

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.getUsersData().subscribe(data => {
      this.chartDatasets = data;
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-diagram-users',
  templateUrl: './diagram-users.component.html',
  styleUrls: ['./diagram-users.component.scss']
})
export class DiagramUsersComponent implements OnInit {

  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    {data: [200, 29, 1]}
  ];
  uSub: Subscription;


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

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.uSub = this.adminService.getUsersData().subscribe(data => {
      this.chartDatasets = data;
    });
  }

}

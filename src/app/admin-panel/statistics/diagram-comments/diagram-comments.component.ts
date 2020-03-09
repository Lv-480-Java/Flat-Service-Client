import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-diagram-comments',
  templateUrl: './diagram-comments.component.html',
  styleUrls: ['./diagram-comments.component.scss']
})
export class DiagramCommentsComponent implements OnInit {


  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    {data: [200, 29, 1]}
  ];
  uSub: Subscription;


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

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.uSub = this.adminService.getCommentsCount().subscribe(data => {
      this.chartDatasets = data;
    });
  }


}

import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  countFlats: number;
  countUsers: number;
  countLandlord: number;
  fSub: Subscription;
  uSub: Subscription;
  lSub: Subscription;

  slides: any = [[]];

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {

    this.fSub = this.adminService.countActiveFlats().subscribe(count => {
      this.countFlats = count;
    });
    this.uSub = this.adminService.countActiveUsers().subscribe(count => {
      this.countUsers = count;
    });
    this.lSub = this.adminService.countActiveLandlords().subscribe(count => {
      this.countLandlord = count;
    });
  }

}

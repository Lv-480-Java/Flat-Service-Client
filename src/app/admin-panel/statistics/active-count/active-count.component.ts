import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-active-count',
  templateUrl: './active-count.component.html',
  styleUrls: ['./active-count.component.scss']
})
export class ActiveCountComponent implements OnInit {

  countFlats: number;
  countUsers: number;
  countLandlord: number;
  fSub: Subscription;
  uSub: Subscription;
  lSub: Subscription;

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

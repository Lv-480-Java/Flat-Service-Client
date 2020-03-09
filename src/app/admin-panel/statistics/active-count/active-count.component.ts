import {Component, OnInit} from '@angular/core';
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

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.countActiveFlats().subscribe(count => {
      this.countFlats = count;
    });
    this.adminService.countActiveUsers().subscribe(count => {
      this.countUsers = count;
    });
    this.adminService.countActiveLandlords().subscribe(count => {
      this.countLandlord = count;
    });
  }
}

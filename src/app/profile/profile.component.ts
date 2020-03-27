import {Component, OnInit} from '@angular/core';
import {Landlord, ProfileService} from '../services/profile.service';
import {User} from '../admin-panel/component/Users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  noPhoto =  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREJEf8sd1jrOUhsma-DECMfCHHH5JVpRdlDt_BabSdGfVSTZhF';
  data: Landlord;
  userData: User;
  constructor(public landlordService: ProfileService) {
  }
  ngOnInit()  {
    this.addPassport();
    this.addUserInfo();
  }

  addPassport() {
    this.landlordService.addPassport()
      .subscribe(data => {
        this.data = data;
      });
  }
  addUserInfo() {
    this.landlordService.addUserInfo()
      .subscribe(userData => {
        this.userData = userData;
      });
  }

  updatePassport(data: Landlord) {
    this.landlordService.updatePassport(data)
      .subscribe(dataResp => {
        this.data = dataResp;
        this.addPassport();
      });

  }
}


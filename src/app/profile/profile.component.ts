import {Component, OnInit} from '@angular/core';
import {Landlord, LandlordUser, ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data: Landlord [] = [];
  userData: LandlordUser [] = [];
  updData: Landlord;
  constructor(private landlordService: ProfileService) {
  }
  ngOnInit()  {
    this.addPassport();
    this.addUserData();
  }

  addPassport() {
    this.landlordService.addPassport()
      .subscribe(data => {
        this.data = data;
      });
  }
  addUserData() {
    this.landlordService. addUserData()
      .subscribe(userData => {
        this.userData = userData;
      });
  }
  updatePassport() {
    this.landlordService.updatePassport()
      .subscribe(updData => {
        this.updData = updData;
      });
  }
}


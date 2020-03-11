import {Component, OnInit} from '@angular/core';
import {Landlord, ProfileService} from '../services/profile.service';
import {User} from '../admin-panel/component/Users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data: Landlord [] = [];
  userData: User;
  constructor(private landlordService: ProfileService) {
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

  updatePassport(data: Landlord[]) {
    this.landlordService.updatePassport(data)
      .subscribe(datan => {
        this.data = datan;
      });
    window.location.href = ('/profile');
  }
}


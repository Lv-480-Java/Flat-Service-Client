import { Component, OnInit } from '@angular/core';
import {ProfileUserService} from '../services/profile.user.service';
import {User} from '../admin-panel/component/Users';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  userData: User;
  constructor(private profileUserService: ProfileUserService) { }

  ngOnInit(): void {
    this.addUserData();
  }

  addUserData() {
    this.profileUserService. addUserData()
      .subscribe(userData => {
        this.userData = userData;
      });
  }
  updateUserData(userData: User) {
    this.profileUserService.updateUserData(userData)
      .subscribe(userdat => {
        this.userData = userdat;
      });
    window.location.href = ('api/data');
  }

}

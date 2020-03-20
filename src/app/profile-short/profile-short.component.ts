import { Component, OnInit } from '@angular/core';
import {User} from '../admin-panel/component/Users';
import {ProfileUserService} from '../services/profile.user.service';

@Component({
  selector: 'app-profile-short',
  templateUrl: './profile-short.component.html',
  styleUrls: ['./profile-short.component.scss']
})
export class ProfileShortComponent implements OnInit {
  userData: User;
  constructor(private profileUserService: ProfileUserService) { }

  ngOnInit(): void {
    this.addUserData();
  }
  addUserData() {
    this.profileUserService.addUserData()
      .subscribe(userData => {
        this.userData = userData;
      });
  }
}

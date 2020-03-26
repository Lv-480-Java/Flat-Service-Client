import {Component, Input, OnInit} from '@angular/core';
import {User} from '../admin-panel/component/Users';
import {ProfileUserService} from '../services/profile.user.service';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-short',
  templateUrl: './profile-short.component.html',
  styleUrls: ['./profile-short.component.scss']
})
export class ProfileShortComponent implements OnInit {
  userData: User;
  id: number;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.addUserData();

    });
  }
  addUserData() {
    console.log(this.id);
    this.userService.getUser(this.id)
      .subscribe(userData => {
        this.userData = userData;
        console.log(this.userData);
      });
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Landlord, ProfileService} from '../../../../services/profile.service';
import {User} from '../../../component/Users';

@Component({
  selector: 'app-user-request-detail',
  templateUrl: './user-request-detail.component.html',
  styleUrls: ['./user-request-detail.component.scss']
})
export class UserRequestDetailComponent implements OnInit {
  noPhoto =  'https://s3.eu-central-1.amazonaws.com/makler.tabbo/photo_2020-04-28_20-46-46.jpg';
  data: Landlord;
  userData: User;
  @Input() id: number;
  constructor(public landlordService: ProfileService) {
  }
  ngOnInit()  {
    this.addPassport();
    this.addUserInfo();
  }

  addPassport() {
    this.landlordService.getPassportByUser(this.id)
      .subscribe(data => {
        this.data = data;
      });
  }
  addUserInfo() {
    this.landlordService.getUserInfo(this.id)
      .subscribe(userData => {
        this.userData = userData;
      });
  }
}

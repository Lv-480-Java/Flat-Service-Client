import {Component, OnInit} from '@angular/core';
import {Landlord, ProfileService} from '../services/profile.service';
import {User} from '../admin-panel/component/Users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  noPhoto =  'https://s3.eu-central-1.amazonaws.com/makler.tabbo/photo_2020-04-28_20-46-46.jpg';
  data: Landlord;
  userData: User;
  constructor(public landlordService: ProfileService) {
  }
  ngOnInit()  {
    this.addPassport();
    this.addUserInfo();
  }
resetData() {
    this.landlordService.error$.next('');
    this.data.firstName = '';
    this.data.lastName = '';
    this.data.authority = '';
    this.data.birthDate = '';
    this.data.birthPlace = '';
    this.data.dateOfIssue = '';
    this.data.expirationDate = '';
    this.data.gender = '';
    this.data.identificationNumber = null;
    this.data.middleName = '';
    this.data.nationality = '';
    this.data.passportNumber = '';
    this.data.passportType = '';
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
    data.birthDate = new Date(data.birthDate).toISOString();
    data.expirationDate = new Date(data.expirationDate).toISOString();
    data.dateOfIssue = new Date(data.dateOfIssue).toISOString();
    this.landlordService.updatePassport(data)
      .subscribe(dataResp => {
        this.data = dataResp;
        this.addPassport();
      });

  }

}

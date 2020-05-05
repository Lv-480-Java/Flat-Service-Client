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
}

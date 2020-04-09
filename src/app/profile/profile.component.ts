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
    this.landlordService.updatePassport(data)
      .subscribe(dataResp => {
        this.data = dataResp;
        this.addPassport();
      });

  }
}


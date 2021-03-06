import {Component, Input, OnInit} from '@angular/core';
import {ProfileUserService} from '../services/profile.user.service';
import {User} from '../admin-panel/component/Users';
import {Landlord} from '../services/profile.service';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  noPhoto =  'https://s3.eu-central-1.amazonaws.com/makler.tabbo/photo_2020-04-28_20-46-46.jpg';
  fileData: File = null;
  userData: User;
  landlordData = true;
  data: Landlord;
  idPassport: number;
  dataLand: User;

  constructor(public profileUserService: ProfileUserService, private http: HttpClient) {
  }

  onFileSelected(event) {
    this.fileData = event.target.files[0];
  }

  onUpload() {
    const fileUpload = new FormData();
    fileUpload.append('file', this.fileData, this.fileData.name)
    return this.http.put(BASE_URL + 'users/profile/update/photo', fileUpload)
      .subscribe(res => {
        console.log(res);
        this.addUserData();
      });
  }
  ngOnInit(): void {
    this.addUserData();
    this.addPassport();
  }
  resetData() {
    this.profileUserService.error$.next('');
    this.userData.username = '';
    this.userData.phoneNumber = '';
  }
  addUserData() {
    this.profileUserService.addUserData()
      .subscribe(userData => {
        this.userData = userData;
      });
  }

  updateUserData(userData: User) {
    this.profileUserService.updateUserData(userData)
      .subscribe(userDataResp => {
        this.userData = userDataResp;
        this.addUserData();
      });
  }
  evaluateToLandlord(dataLand: User) {
    this.profileUserService.evaluateToLandlord(dataLand)
      .subscribe(dataLandRes => {
        this.dataLand = dataLandRes;
        this.addUserData();
      });
  }

  addPassport() {
    this.profileUserService.addPassport()
      .subscribe(data => {
        this.data = data;
        this.idPassport = this.data.id;
        if (this.idPassport === null) {
          this.landlordData = false;
        }
      });
  }
}

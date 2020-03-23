import {Component, Input, OnInit} from '@angular/core';
import {ProfileUserService} from '../services/profile.user.service';
import {User} from '../admin-panel/component/Users';
import {Landlord} from '../services/profile.service';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  selectedFile: File
  userData: User;
  landlordData = true;
  data: Landlord;
  idPassport: number;
  constructor(private profileUserService: ProfileUserService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.addUserData();
    this.addPassport();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    this.http.post(BASE_URL + 'my-backend.com/file-upload', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event);
      });
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

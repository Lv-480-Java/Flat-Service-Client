import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  done = false;
  constructor(private httpService: HttpService) {}
  submit(user: User) {
    this.httpService.postData(user)
      .subscribe(
        (data: User) => {this.done = true; },
        error => console.log(error)
      );
  }

  ngOnInit(): void {
  }

}

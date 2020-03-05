import {Component, OnInit} from '@angular/core';
import {User} from '../User';
import {HttpUserService} from '../services/http.user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  user: User = new User();
  done = false;

  constructor(private httpService: HttpUserService) {
  }

  submit(user: User) {
    this.httpService.postData(user)
      .subscribe(
        (data: User) => {
          this.done = true;
        },
        error => console.log(error)
      );
  }


  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required]),
      email: new FormControl(null, [
        Validators.email,
        Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  /*  submit() {
      console.log("Form submitted: ", this.form)
      const formData = {...this.form.value}
      console.log("Form Data", formData)
    }*/
}

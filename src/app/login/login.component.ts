import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.email,
      Validators.required
    ]),
      password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  }

  submit() {
    if (this.loginForm.invalid){
      return
    }
    this.loginService.signIn(this.loginForm.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.log('Error!', error)
      );
  }


}

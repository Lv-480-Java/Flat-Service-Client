import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../shared/interfaces';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(public authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService) {
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
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(user).subscribe((res) => {
      this.localStorageService.setAccessToken(res.headers.get('accesstoken'));
      this.localStorageService.setRefreshToken(res.headers.get('refreshtoken'));
      localStorage.setItem('user', JSON.stringify(res.body));
      this.loginForm.reset();
      this.router.navigate(['/flats']);
      this.submitted = false;
    });
  }
}

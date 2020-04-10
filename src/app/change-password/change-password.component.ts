import { Component, OnInit } from '@angular/core';
import {UserChangePasswordService} from '../services/user-change-password.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    public userChangePasswordService: UserChangePasswordService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  // public changePassword(userChangePassword: UserChangePassword) {
  //   //   this.setNullAllMessage();
  //   //   this.loadingAnim = true;
  //   //   this.userChangePasswordService.changePassword(userChangePassword).subscribe(
  //   //     () => {
  //   //       this.router.navigateByUrl('').then(r => r);
  //   //     },
  //   //     (errors: HttpErrorResponse) => {
  //   //       this.passwordErrorMessageBackEnd = 'Incorrect Data';
  //   //       this.loadingAnim = false;
  //   //     });
  //   //
  //   //   this.loadingAnim = false;
  //   // }
  changePassword(): Observable<any> {
    if (this.form.invalid) {
      return;
    }
    this.userChangePasswordService.changePassword(this.form.value)
      .subscribe(
        (response) => {
          this.form.reset();
          this.router.navigate(['/data']);
        }
      );
  }

}

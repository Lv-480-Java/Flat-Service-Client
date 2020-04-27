import { Component, OnInit } from '@angular/core';
import {UserConfirmRegistrationService} from '../services/user-confirm-registration.servise';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {
  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userConfirmRegistrationService: UserConfirmRegistrationService
  ) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    this.activate();
    this.userConfirmRegistrationService.openSnackBar('Your account was successfully activated', 'X');
    this.router.navigateByUrl('login');
  }

  private activate() {
    console.log(this.token);
    this.userConfirmRegistrationService.activate(this.token).subscribe(
      () => {
        this.router.navigateByUrl('login');
      }
    );
  }

}

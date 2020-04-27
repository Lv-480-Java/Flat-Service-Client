import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivationEmail} from '../model/activation-email';
import {ResendRegistrationTokenService} from '../services/resend-registration-token.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-resend-registration-token',
  templateUrl: './resend-registration-token.component.html',
  styleUrls: ['./resend-registration-token.component.scss']
})
export class ResendRegistrationTokenComponent implements OnInit {
  resendTokenForm: FormGroup;
  emailErrorMessageBackEnd: string;
  loadingAnim: boolean;
  activationEmail: ActivationEmail;

  constructor(
    private router: Router,
    public resendRegistrationTokenService: ResendRegistrationTokenService) {
    this.activationEmail = new ActivationEmail();
  }

  ngOnInit() {
    this.resendTokenForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ])
    });
    this.emailErrorMessageBackEnd = null;
    this.loadingAnim = false;

  }

  public resend(): Observable<any> {
    if (this.resendTokenForm.invalid) {
      return;
    }
    this.resendRegistrationTokenService.activate(this.resendTokenForm.value).subscribe(() => {
        this.resendRegistrationTokenService.openSnackBar('Check your email to complete registration', 'X')
        this.router.navigateByUrl('login').then(r => r);
      }
    );

  }

}

import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../services/registration.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private registrationService: RegistrationService) {
  }

  submit() {
    this.registrationService.register(this.form.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.log('Error!', error)
      );

    this.form.reset();
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\+?3?8?(0\\d{9})$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
}

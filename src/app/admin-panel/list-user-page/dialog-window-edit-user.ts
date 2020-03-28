import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../component/Users';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'dialog-window-edit-user.html',
  styleUrls: ['./list-user-page.component.scss']
})
export class DialogWindowEditUserComponent implements OnInit {
  formUser: FormGroup;

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<DialogWindowEditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) {}

  ngOnInit(): void {
    this.formUser = new FormGroup({
      username: new FormControl(this.user.username, [
        Validators.required,
      ]),
      email: new FormControl(this.user.email, [
        Validators.email,
        Validators.required
      ]),
      phoneNumber: new FormControl(this.user.phoneNumber, [
        Validators.required,
        Validators.pattern('^\\+?3?8?(0\\d{9})$')
      ])
    });
  }

  put() {
    this.userService.updateUser(this.formUser.value).subscribe(
      response => console.log('Created', response),
      error => console.log('Error!', error));
    console.log('Updated user');
    this.dialogRef.close();
  }

  closeClick(): void {
    this.dialogRef.close();
  }
}

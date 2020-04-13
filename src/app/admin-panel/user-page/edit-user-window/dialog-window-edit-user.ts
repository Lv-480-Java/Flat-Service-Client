import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../component/Users';
import {UserService} from '../../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: 'dialog-window-edit-user.html',
  styleUrls: ['../user-page.component.scss']
})
export class DialogWindowEditUserComponent implements OnInit, OnDestroy {
  formUser: FormGroup;
  vSub: Subscription;
  error: string;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, public userService: UserService, public message: MatDialog,
              public dialogRef: MatDialogRef<DialogWindowEditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formUser = this.formBuilder.group({
      username: [this.user.username, [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: [this.user.email, [
        Validators.email,
        Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'),
        Validators.required
      ]],
      phoneNumber: [this.user.phoneNumber, [
        Validators.required,
        Validators.pattern('^\\+?3?8?(0\\d{9})$')
      ]]
    });
  }

  put() {
    const controls = this.formUser.controls;
    if (this.formUser.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    console.log('Update user');
    console.log(this.formUser.value);
    this.vSub = this.userService.updateUser(this.formUser.value).subscribe(() => {
      this.snackBar.open('User was edited successfully !', 'close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['snackbar']
      });
      this.dialogRef.close();
    });
  }

  closeClick(): void {
    console.log('Cancel');
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    console.log('Finished destroy');
  }
}

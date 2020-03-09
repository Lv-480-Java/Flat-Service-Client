import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../component/Users';
import {UserService} from '../../services/user.service';

@Component({
  templateUrl: 'dialog-window-edit-user.html',
  styleUrls: ['./list-user-page.component.scss']
})
export class DialogWindowEditUserComponent {

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<DialogWindowEditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) {}

  put() {
    console.log();
  }

  closeClick() {
    console.log('operation Cancel');
    this.dialogRef.close();
  }
}

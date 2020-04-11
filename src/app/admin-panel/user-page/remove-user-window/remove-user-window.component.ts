import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../component/Users';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../services/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-remove-user-window',
  templateUrl: './remove-user-window.component.html',
  styleUrls: ['./remove-user-window.component.scss']
})
export class RemoveUserWindowComponent implements OnInit, OnDestroy {
  vSub: Subscription;

  constructor(private snackBar: MatSnackBar, private userService: UserService, public message: MatDialog,
              public dialogRef: MatDialogRef<RemoveUserWindowComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit(): void {
  }

  remove() {
    this.vSub = this.userService.removeUser(this.user.id).subscribe(() => {
      this.snackBar.open('User was deleted successfully !', 'close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['snackbar']
      });
      this.dialogRef.close();
    });
    console.log('Deleted user');
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

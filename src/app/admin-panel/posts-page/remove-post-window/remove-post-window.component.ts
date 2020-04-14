import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {FlatService} from '../../../services/flat.service';
import {RequestForBanFlat} from '../../component/RequestForBanFlat';

@Component({
  selector: 'app-remove-post-window',
  templateUrl: './remove-post-window.component.html',
  styleUrls: ['./remove-post-window.component.scss']
})
export class RemovePostWindowComponent implements OnInit, OnDestroy {
  vSub: Subscription;

  constructor(private snackBar: MatSnackBar, private flatService: FlatService, public message: MatDialog,
              public dialogRef: MatDialogRef<RemovePostWindowComponent>,
              @Inject(MAT_DIALOG_DATA) public requestForBan: RequestForBanFlat) { }

  ngOnInit(): void {
  }

  removeFlat() {
    this.vSub = this.flatService.removePost(this.requestForBan.flat.id).subscribe(() => {
      this.snackBar.open('Flat was deleted successfully !', 'close', {
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

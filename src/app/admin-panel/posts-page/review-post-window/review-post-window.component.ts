import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FlatService} from '../../../services/flat.service';
import {RequestForBanFlat} from '../../component/RequestForBanFlat';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-review-post-window',
  templateUrl: './review-post-window.component.html',
  styleUrls: ['./review-post-window.component.scss']
})
export class ReviewPostWindowComponent implements OnInit, OnDestroy {
  vSub: Subscription;
  requestForBan: RequestForBanFlat;

  constructor(
      public dialogRef: MatDialogRef<ReviewPostWindowComponent>,
      @Inject(MAT_DIALOG_DATA) public data: RequestForBanFlat, private flatService: FlatService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  activated() {
    this.requestForBan = this.data;
    this.vSub = this.flatService.activatedPost(this.requestForBan).subscribe(() => {
      this.snackBar.open('Flat was successfully Activated!', 'close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['snackbar']
      });
      this.dialogRef.close();
    });
  }

  deactivated() {
    this.requestForBan = this.data;
    this.vSub = this.flatService.deactivatedPost(this.requestForBan).subscribe(() => {
      this.snackBar.open('Flat was successfully Deactivated!', 'close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['snackbar']
      });
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
    this.snackBar.open('Request was canceled!', 'close', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snackbar']
    });
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    console.log('Finished destroy');
  }
}

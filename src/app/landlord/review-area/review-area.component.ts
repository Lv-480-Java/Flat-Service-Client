import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RequestMessageComponent} from "../../admin-panel/requests/review-window/request-message/request-message.component";
import {FlatBookingService} from "../../services/flat-booking.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-review-area',
  templateUrl: './review-area.component.html',
  styleUrls: ['./review-area.component.scss']
})
export class ReviewAreaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReviewAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private bookingService: FlatBookingService,
    public message: MatDialog, private bar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  approve() {
    this.bookingService.approveRequestForFlatBooking(this.data.requestId).subscribe(
      success => {
        this.openMessageDialog('Request was successfully approved!');
      },
      error => {
        this.bar.open(error.error.message, "x",
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      }
    );
    this.close();
  }

  decline() {
    this.bookingService.declineRequestForFlatBooking(this.data.requestId).subscribe(
      success => {
        this.openMessageDialog('Request was declined!');
      },
      error => {
        this.bar.open(error.error.message, "x",
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      }
    );
    this.close();
  }

  openMessageDialog(msg) {
    const messageDialog = this.message.open(RequestMessageComponent, {data: {message: msg}});
    messageDialog.afterClosed().subscribe();
  }

}

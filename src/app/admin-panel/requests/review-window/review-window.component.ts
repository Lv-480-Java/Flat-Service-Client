import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RequestsService} from '../../../services/requests.service';
import {RequestMessageComponent} from './request-message/request-message.component';


@Component({
  selector: 'app-user-review-window',
  templateUrl: './review-window.component.html',
  styleUrls: ['./review-window.component.scss']
})
export class ReviewWindowComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReviewWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private requestsService: RequestsService, public message: MatDialog) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  approve() {
    console.log(this.data.requestId);
    if (this.data.type === 'FLATS') {
      this.requestsService.approveFlatRequests(this.data.requestId).subscribe();
    } else {
      this.requestsService.approveUserRequests(this.data.requestId).subscribe();
    }
    this.close();
    this.openMessageDialog('Request was successfully approved!');
  }

  decline() {
    if (this.data.type === 'FLATS') {
      this.requestsService.declineFlatRequests(this.data.requestId).subscribe();
    } else {
      this.requestsService.declineUserRequests(this.data.requestId).subscribe();
    }
    this.close();
    this.openMessageDialog('Request was declined!');
  }

  openMessageDialog(msg) {
    const messageDialog = this.message.open(RequestMessageComponent, {data: {message: msg}});
    messageDialog.afterClosed().subscribe();
  }

}

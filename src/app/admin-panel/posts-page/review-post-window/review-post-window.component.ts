import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RequestsService} from '../../../services/requests.service';
import {RequestMessageComponent} from '../../requests/review-window/request-message/request-message.component';
import {FlatService} from '../../../services/flat.service';

@Component({
  selector: 'app-review-post-window',
  templateUrl: './review-post-window.component.html',
  styleUrls: ['./review-post-window.component.scss']
})
export class ReviewPostWindowComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReviewPostWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private flatService: FlatService, public message: MatDialog) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  deactivated() {
    console.log(this.data.requestId);
    this.flatService.deactivatedPost(this.data.requestId).subscribe();
    this.close();
    this.openMessageDialog('Flat was successfully Deactivated!');
  }

  cancel() {
    this.close();
    this.openMessageDialog('Request was canceled!');
  }

  openMessageDialog(msg) {
    const messageDialog = this.message.open(RequestMessageComponent, {data: {message: msg}});
    messageDialog.afterClosed().subscribe();
  }

}

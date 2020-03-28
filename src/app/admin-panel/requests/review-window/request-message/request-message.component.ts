import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-request-message',
  templateUrl: './request-message.component.html',
  styleUrls: ['./request-message.component.scss']
})
export class RequestMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequestMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-user-review-window',
  templateUrl: './review-window.component.html',
  styleUrls: ['./review-window.component.scss']
})
export class ReviewWindowComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReviewWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}

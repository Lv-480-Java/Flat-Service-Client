import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AgreementService} from "../../services/agreement.service";
import {RequestMessageComponent} from "../../admin-panel/requests/review-window/request-message/request-message.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-agreement-review-area',
  templateUrl: './agreement-review-area.component.html',
  styleUrls: ['./agreement-review-area.component.scss']
})
export class AgreementReviewAreaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AgreementReviewAreaComponent>,
              @Inject(MAT_DIALOG_DATA) public data, public message: MatDialog,
              private bar: MatSnackBar, private agreementService: AgreementService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  sendToLandlord() {
    this.agreementService.sendAgreementToLandlord(this.data.requestId).subscribe(
      success => {
        this.openMessageDialog('Agreement was successfully sent to Landlord!');
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

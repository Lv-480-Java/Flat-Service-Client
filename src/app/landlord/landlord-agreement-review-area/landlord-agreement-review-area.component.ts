import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AgreementService} from "../../services/agreement.service";
import {RequestMessageComponent} from "../../admin-panel/requests/review-window/request-message/request-message.component";

@Component({
  selector: 'app-landlord-agreement-review-area',
  templateUrl: './landlord-agreement-review-area.component.html',
  styleUrls: ['./landlord-agreement-review-area.component.scss']
})
export class LandlordAgreementReviewAreaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LandlordAgreementReviewAreaComponent>,
              @Inject(MAT_DIALOG_DATA) public data, public message: MatDialog,
              private bar: MatSnackBar, private agreementService: AgreementService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  acceptRenterAgreement() {
    this.agreementService.acceptRenterAgreement(this.data.requestId).subscribe(
      success => {
        this.openMessageDialog('Agreement was successfully sent to your e-mail!');
        this.close();
      },
      error => {
        this.bar.open(error.error.message, "x",
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
        this.close();
      }
    );
  }

  openMessageDialog(msg) {
    const messageDialog = this.message.open(RequestMessageComponent, {data: {message: msg}});
    messageDialog.afterClosed().subscribe();
  }
}

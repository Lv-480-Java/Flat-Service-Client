import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from "../../../services/payment.service";

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit, OnDestroy {

  month = '01';
  year = '20';
  cardNumber = '';
  length = 0;
  vSub: Subscription;
  paymentForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<PaymentPageComponent>,
              private paymentService: PaymentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.paymentForm = new FormGroup({
      card: new FormControl('', [
        Validators.required,
        Validators.minLength(16)
      ]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  keyUpCustom(event) {
    const value = event.key.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const isBackspace = event.key === 'Backspace';
    if (this.cardNumber.length === 16) {
      event.preventDefault();
      console.log('return');
      return;
    }
    this.cardNumber += value;
    if (isBackspace) {
      this.cardNumber = this.cardNumber.substring(0, this.cardNumber.length - 1);
      return;
    }
  }

  pay(id: number) {
    if (this.paymentForm.invalid) {
      console.log('Date is invalid');
      return;
    }
    this.paymentService.payForApartment(id).subscribe(
      success => {
        this.snackBar.open('Payment was successful!', 'x',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar']
          });
        this.dialogRef.close();
      },
      error => {
        this.snackBar.open(error.error.message, 'x',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar']
          });
        this.dialogRef.close();
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    console.log('Finished destroy');
  }

}

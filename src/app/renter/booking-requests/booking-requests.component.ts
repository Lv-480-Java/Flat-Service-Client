import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FlatBookingService} from '../../services/flat-booking.service';
import {RequestsForFlatBooking} from '../entity/request-for-flat-booking';
import {MatDialog} from '@angular/material/dialog';
import {AgreementReviewAreaComponent} from '../agreement-review-area/agreement-review-area.component';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {AgreementReviewComponent} from '../agreement-review/agreement-review.component';
import {PaymentPageComponent} from './payment-page/payment-page.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss']
})
export class BookingRequestsComponent implements OnInit, OnDestroy {
  @ViewChild(AgreementReviewAreaComponent) agreementReviewAreaComponent;
  @ViewChild(AgreementReviewComponent) agreementReviewComponent;
  @ViewChild(PaymentPageComponent) paymentPageComponent;

  vSub: Subscription;
  data: any;
  requests: RequestsForFlatBooking = new RequestsForFlatBooking();
  status = 'all';

  constructor(private http: HttpClient, private bookingService: FlatBookingService,
              private bar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadFlats();
  }

  loadFlats() {
    this.bookingService.getRenterRequests()
      .subscribe(data => {
        this.data = data;
        this.requests.content = this.data;
        this.status = 'all';
        if (this.requests.content.length < 1) {
          this.bar.open('You haven\'t made any requests yet!', 'x',
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar']
            });
        }
      });
  }

  loadDeclinedFlats() {
    this.bookingService.getDeclinedRenterRequests()
      .subscribe(data => {
        this.data = data;
        this.requests.content = this.data;
        this.status = 'declined';
        if (this.requests.content.length < 1) {
          this.bar.open('You don\'t have any declined requests!', 'x',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar']
            });
        }
      });
  }

  loadActiveFlats() {
    this.bookingService.getActiveRenterRequests()
      .subscribe(data => {
        this.data = data;
        this.requests.content = this.data;
        this.status = 'active';
        if (this.requests.content.length < 1) {
          this.bar.open('You don\'t have any active requests!', 'x',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar']
            });
        }
      });
  }

  openCancelDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm canceling the request?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.declineRequestForFlatBooking(id).subscribe(
          success => {
            this.bar.open('Request was canceled!', 'x',
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['snackbar']
              });
            this.loadFlats();
          },
          error => {
            this.bar.open(error.error.message, 'x',
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['snackbar']
              });
          }
        );
      }
    });
  }

  createAgreement(id: number) {
    this.openDialog(id);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(AgreementReviewAreaComponent, {data: {requestId: id}});
    dialogRef.afterClosed().subscribe(
      success => {
        this.loadFlats();
      }
    );
  }

  payForApartment(requestId: number, price: number) {
    this.openDialogPayment(requestId, price);
  }

  openDialogPayment(requestId: number, price: number): void {
    const dialogRef = this.dialog.open(PaymentPageComponent, {
      data: {id: requestId, flatPrice: price},
      panelClass: 'customOpenDialog',
      width: '600px',
      height: '450px'
    });
    this.vSub = dialogRef.afterClosed().subscribe(() => {
      this.loadFlats();
    });
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
  }

}

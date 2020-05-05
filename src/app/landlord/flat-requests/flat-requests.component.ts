import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FlatBookingService} from "../../services/flat-booking.service";
import {MatTableDataSource} from "@angular/material/table";
import {ReviewAreaComponent} from "../review-area/review-area.component";
import {LandlordAgreementReviewAreaComponent} from "../landlord-agreement-review-area/landlord-agreement-review-area.component";
import {RequestForFlatBooking} from "../../renter/entity/request-for-flat-booking";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {LandlordAgreementReviewComponent} from "../landlord-agreement-review/landlord-agreement-review.component";

@Component({
  selector: 'app-flat-requests',
  templateUrl: './flat-requests.component.html',
  styleUrls: ['./flat-requests.component.scss']
})
export class FlatRequestsComponent implements OnInit {
  @ViewChild(ReviewAreaComponent) flatReviewAreaComponent;
  @ViewChild(LandlordAgreementReviewAreaComponent) agreementReviewAreaComponent;
  @ViewChild(LandlordAgreementReviewComponent) agreementReviewComponent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'author', 'date', 'review', 'agreement', 'cancel'];
  dataSource;

  statuses = ['NEW', 'VIEWED', 'APPROVED', 'DECLINED'];
  label: string;
  type: string;
  status: string = 'NEW';
  statusForm: FormGroup;

  requests;
  pageNumber = 0;
  pageSize = 5;

  constructor(public bookingService: FlatBookingService, private formBuilder: FormBuilder,
              private bar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
    this.openSnackBar();
  }

  loadData() {
    if (this.status == 'NEW') {
      this.loadPage(this.statuses[0]);
    }
    if (this.status == 'VIEWED') {
      this.loadPage(this.statuses[1]);
    }
    if (this.status == 'APPROVED') {
      this.loadPage(this.statuses[2]);
    }
    if (this.status == 'DECLINED') {
      this.loadPage(this.statuses[3]);
    }
  }

  getLandlordRequests() {
    this.bookingService.getLandlordRequests(this.pageNumber, this.pageSize, this.status).subscribe(
      data => {
        const totalElements = new Array(data[`totalElements`]);
        this.requests = data[`content`];
        this.dataSource = new MatTableDataSource<RequestForFlatBooking>(this.requests);
        this.paginator.length = totalElements.length;
      });
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getLandlordRequests();
  }

  onChangeStatus(value) {
    this.status = value;
    this.getLandlordRequests();
  }

  review(id: any) {
    this.bookingService.reviewRequest(id).subscribe();
    this.openDialog(id);
  }

  openDialog(id: number): void {
    const req = this.requests.find(x => x.id === id);
    const dialogRef = this.dialog.open(ReviewAreaComponent, {
      data: {requestId: id, request: req}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPage(this.status);
    });
  }

  loadPage(status) {
    this.status = status;
    this.statusForm = this.formBuilder.group({statusForm: [null]});
    this.statusForm.get('statusForm').setValue(status);
    this.getLandlordRequests();
  }

  openSnackBar() {
    console.log('snackbar');
    this.bookingService.getNewLandlordRequests().subscribe(data => {
      this.bar.open(data + ' New Requests', 'close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar']
      });
    });
  }

  reviewAgreement(id: number) {
    this.openAgreementDialog(id);
  }

  openAgreementDialog(id: number): void {
    const dialogRef = this.dialog.open(LandlordAgreementReviewAreaComponent, {data: {requestId: id}});
    dialogRef.afterClosed().subscribe(
      success => {
        this.loadData();
      }
    );
  }

  openCancelDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm canceling the request?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.declineRequestForFlatBooking(id).subscribe(
          success => {
            this.bar.open("Request was canceled!", "x",
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['snackbar']
              });
            this.loadData();
          },
          error => {
            this.bar.open(error.error.message, "x",
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['snackbar']
              });
            this.loadData();
          }
        );
      }
    });
  }

  checkPayment() {

  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FlatBookingService} from "../../services/flat-booking.service";
import {MatTableDataSource} from "@angular/material/table";
import {RequestsForFlatVerification} from "../../admin-panel/requests/entity/requests-for-flat-verification";
import {ReviewAreaComponent} from "../review-area/review-area.component";

@Component({
  selector: 'app-flat-requests',
  templateUrl: './flat-requests.component.html',
  styleUrls: ['./flat-requests.component.scss']
})
export class FlatRequestsComponent implements OnInit {
  @ViewChild(ReviewAreaComponent) flatReviewAreaComponent;

  displayedColumns: string[] = ['id', 'author', 'date', 'review', 'agreement', 'cancel'];
  dataSource;

  statuses = ['NEW', 'VIEWED', 'APPROVED', 'DECLINED'];
  label: string;
  type: string;
  status: string;
  statusForm: FormGroup;

  requests;
  pageNumber = 0;
  pageSize = 5;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public bookingService: FlatBookingService, private formBuilder: FormBuilder,
              private bar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadPage(this.statuses[0]);
    this.openSnackBar();
  }

  getLandlordRequests() {
    this.bookingService.getLandlordRequests(this.pageNumber, this.pageSize, this.status).subscribe(
      data => {
        const totalElements = new Array(data[`totalElements`]);
        this.requests = data[`content`];
        this.dataSource = new MatTableDataSource<RequestsForFlatVerification>(this.requests);
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

  decline(id: number) {
    this.bookingService.declineRequestForFlatBooking(id).subscribe(
      success => {
        this.bar.open("Request was declined!", "x",
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      },
      error => {
        this.bar.open(error.error.message, "x",
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      }
    );
    this.ngOnInit();
  }

  openSnackBar() {
    console.log('snackbar');
    this.bookingService.getNewRequests().subscribe(data => {
      this.bar.open(data + ' New Requests', 'close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar']
      });
    });
  }
}

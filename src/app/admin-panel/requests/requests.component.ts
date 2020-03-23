import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../component/Users';
import {RequestsService} from '../../services/requests.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ReviewWindowComponent} from './review-window/review-window.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  @ViewChild(ReviewWindowComponent) userReviewWindowComponent;

  labelsTypes = [{label: 'For Flat Publication', type: 'FLATS'},
    {label: 'For Renter Verification', type: 'RENTERS'},
    {label: 'For Landlord Verification', type: 'LANDLORDS'},
    {label: 'For Moderator Verification', type: 'MODERATORS'}];

  displayedColumns: string[] = ['id', 'author', 'date', 'review'];
  dataSource;

  statuses = ['NEW', 'VIEWED', 'APPROVED', 'DECLINED'];
  label: string;
  type: string;
  status: string;
  typeForm: FormGroup;
  statusForm: FormGroup;


  requests;
  pageNumber = 0;
  pageSize = 5;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private requestsService: RequestsService, private formBuilder: FormBuilder,
              private bar: MatSnackBar, public dialog: MatDialog) {
  }

  onChangeType(value) {
    this.type = value.type;
    this.label = value.label;
    this.getRequestsByPage();
  }

  onChangeStatus(value) {
    this.status = value;
    console.log(this.status);
    this.getRequestsByPage();
  }

  ngOnInit(): void {
    this.label = this.labelsTypes[0].label;
    this.type = this.labelsTypes[0].type;
    this.status = this.statuses[0];

    this.typeForm = this.formBuilder.group({typeForm: [null]});
    this.typeForm.get('typeForm').setValue(this.labelsTypes[0]);

    this.statusForm = this.formBuilder.group({statusForm: [null]});
    this.statusForm.get('statusForm').setValue(this.statuses[0]);

    this.openSnackBar();

    this.getRequestsByPage();
  }

  openSnackBar() {
    console.log('snackbar');
    this.requestsService.getNewRequests().subscribe(data => {
      this.bar.open(data + ' New Requests', 'close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar']
      });
    });
  }

  getRequestsByPage() {
    console.log('Get Requests');
    console.log(this.pageNumber, this.pageSize, this.type, this.status);
    this.requestsService.getRequests(this.pageNumber, this.pageSize, this.type, this.status)
      .subscribe(data => {
        const totalElements = new Array(data[`totalElements`]);
        this.requests = data[`content`];
        console.log(data[`content`]);
        this.dataSource = new MatTableDataSource<User>(this.requests);
        this.paginator.length = totalElements.length;
      });
    console.log('Get Requests');
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getRequestsByPage();
  }

  review(id: any) {
    console.log('reviewed ' + id + ' ' + this.type);
    // this.requestsService.reviewRequest(id, this.type).subscribe();
    this.getRequestsByPage();
    this.openDialog(id);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ReviewWindowComponent, {
      data: {requestId: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  approve(id: any) {

  }

  decline(id: any) {

  }


}


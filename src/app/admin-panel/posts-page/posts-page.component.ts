import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {ReviewPostWindowComponent} from './review-post-window/review-post-window.component';
import {FlatService} from '../../services/flat.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RemovePostWindowComponent} from './remove-post-window/remove-post-window.component';
import {RequestForBanFlat} from '../component/RequestForBanFlat';
import {PaymentPageComponent} from './payment-page/payment-page.component';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit, OnDestroy {

  @ViewChild(ReviewPostWindowComponent) userReviewWindowComponent;

  vSub: Subscription;

  displayedColumns: string[] = ['id', 'author', 'date', 'review', 'remove'];
  dataSource = new MatTableDataSource<RequestForBanFlat>();

  statuses = ['ACTIVATED', 'DEACTIVATED'];
  label: string;
  status: string;
  statusForm: FormGroup;

  posts;
  pageNumber = 0;
  pageSize = 5;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private snackBar: MatSnackBar, private flatService: FlatService, private formBuilder: FormBuilder,
              public dialog: MatDialog) {
  }

  onChangeStatus(value) {
    this.status = value;
    this.getPostsByPage();
  }

  ngOnInit(): void {
    this.loadPage(this.statuses[0]);
  }

  loadPage(status) {
    this.status = status;
    this.statusForm = this.formBuilder.group({statusForm: [null]});
    this.statusForm.get('statusForm').setValue(status);
    this.getPostsByPage();
  }

  getPostsByPage() {
    console.log('Operation Posts');
    this.vSub = this.flatService.getAllPosts(this.pageNumber, this.pageSize, this.status)
      .subscribe(data => {
        const totalElements = new Array(data[`totalElements`]);
        this.posts = data[`content`];
        this.dataSource = new MatTableDataSource<RequestForBanFlat>(this.posts);
        this.paginator.length = totalElements.length;
      });
    console.log('Get Request');
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getPostsByPage();
  }

  review(element) {
    this.openDialogReview(element);
  }

  payment() {
    this.openDialogPayment();
  }

  openDialogPayment(): void {
    console.log('Open dialog for review');
    const dialogRef = this.dialog.open(PaymentPageComponent, {
      panelClass: 'customOpenDialog',
      width: '600px',
      height: '450px'
    });
    this.vSub = dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogReview(element): void {
    console.log('Open dialog for review');
    const dialogRef = this.dialog.open(ReviewPostWindowComponent, {
      width: '900px',
      height: '700px',
      data: element
    });
    this.vSub = dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getPostsByPage();
    });
  }

  openDialogRemoveFlat(element) {
    console.log('Opened remove operation');
    const dialogRef = this.dialog.open(RemovePostWindowComponent, {
      data: element
    });
    this.vSub = dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getPostsByPage();
    });
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    console.log('Finished destroy');
  }
}

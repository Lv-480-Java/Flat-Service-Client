import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {RequestsService} from '../../services/requests.service';
import {User} from '../component/Users';
import {ReviewPostWindowComponent} from './review-post-window/review-post-window.component';
import {FlatService} from '../../services/flat.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  @ViewChild(ReviewPostWindowComponent) userReviewWindowComponent;

  displayedColumns: string[] = ['id', 'author', 'date', 'review'];
  dataSource;

  statuses = ['ACTIVE', 'DEACTIVATED'];
  label: string;
  status: string;
  statusForm: FormGroup;

  posts;
  pageNumber = 0;
  pageSize = 5;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private flatService: FlatService, private formBuilder: FormBuilder,
              public dialog: MatDialog) {
  }

  onChangeStatus(value) {
    this.status = value;
    console.log(this.status);
    this.getRequestsByPage();
  }

  ngOnInit(): void {
    this.loadPage(this.statuses[0]);
  }

  loadPage(status) {
    this.status = status;
    this.statusForm = this.formBuilder.group({statusForm: [null]});
    this.statusForm.get('statusForm').setValue(status);
    this.getRequestsByPage();
  }

  getRequestsByPage() {
    console.log('Operation Posts');
    this.flatService.getAllPosts(this.pageNumber, this.pageSize)
      .subscribe(data => {
        const totalElements = new Array(data[`totalElements`]);
        this.posts = data[`content`];
        this.dataSource = new MatTableDataSource<User>(this.posts);
        this.paginator.length = totalElements.length;
      });
    console.log('Get Request');
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getRequestsByPage();
  }

  review(id: any) {
    console.log('reviewed ' + id);
    this.openDialog(id);
  }

  openDialog(id: number): void {
    console.log('review flat:');
    const pos = this.posts.find(x => x.id === id);
    const dialogRef = this.dialog.open(ReviewPostWindowComponent, {
      data: {requestId: id,  post: pos}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadPage(this.status);
    });
  }

}

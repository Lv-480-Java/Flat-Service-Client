import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {DialogWindowEditUserComponent} from '../list-user-page/dialog-window-edit-user';
import {Post} from '../component/Post';

@Component({
  selector: 'app-list-posts-page',
  templateUrl: './list-posts-page.component.html',
  styleUrls: ['./list-posts-page.component.scss']
})
export class ListPostsPageComponent implements OnInit {
  pageNumber = 0;
  pageSize = 5;
  formUser: FormGroup;
  vSub: Subscription;
  dSub: Subscription;
  displayedColumns: string[] = ['id', 'author', 'date_published', 'view_post'];
  dataSource = new MatTableDataSource<Post>();

  constructor(public dialog: MatDialog) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    // this.getAllUserByPage();
  }

  openDialog(element) {
    console.log('Opened edit form');
    const dialogRef = this.dialog.open(DialogWindowEditUserComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    }).unsubscribe();
  }

}

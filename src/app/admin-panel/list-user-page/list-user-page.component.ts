import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {User} from '../component/Users';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogWindowEditUserComponent} from './dialog-window-edit-user';


@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.scss']
})
export class ListUserPageComponent implements OnInit, OnDestroy {
  users: User[];
  pageNumber = 0;
  pageSize = 5;
  vSub: Subscription;
  dSub: Subscription;
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', 'role', 'edit', 'button'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getAllUserByPage();
  }

  create(): void {
    const user: User = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      phoneNumber: (document.getElementById('phone') as HTMLInputElement).value
    };
    this.userService.createUser(user).subscribe(() => {
      (document.getElementById('username') as HTMLInputElement).value = '';
      (document.getElementById('email') as HTMLInputElement).value = '';
      (document.getElementById('password') as HTMLInputElement).value = '';
      (document.getElementById('phone') as HTMLInputElement).value = '';
      this.getAllUserByPage();
    });
    console.log('Created user');
  }

  getAllUserByPage() {
    this.userService.getAllUserByPage(this.pageNumber, this.pageSize)
      .subscribe(data => {
        const listUsers = data[`content`];
        const totalElements = new Array(data[`totalElements`]);
        this.users = listUsers;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.paginator.length = totalElements.length;
      });
    console.log('Get users');
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getAllUserByPage();
  }

  openDialog() {
    console.log('Opened edit form');
    const dialogRef = this.dialog.open(DialogWindowEditUserComponent, {
      width: '280px',
      data: this.users,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.users = result;
    }).unsubscribe();
  }

  remove(id: string) {
    this.dSub = this.userService.removeUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.getAllUserByPage();
    });
    console.log('Deleted user');
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    console.log('Finished destroy');
  }
}

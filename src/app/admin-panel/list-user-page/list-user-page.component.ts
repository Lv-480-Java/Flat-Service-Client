import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {User} from '../component/Users';
import {MatRowDef, MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogWindowEditUserComponent} from './dialog-window-edit-user';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';


@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.scss']
})
export class ListUserPageComponent implements OnInit, OnDestroy {
  users: User[];
  pageNumber = 0;
  pageSize = 5;
  formUser: FormGroup;
  vSub: Subscription;
  dSub: Subscription;
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', 'role', 'edit', 'button'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllUserByPage();
    this.formUser = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\+?3?8?(0\\d{9})$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  create() {
    this.userService.createUser(this.formUser.value).subscribe(
      response => console.log('Created', response),
      error => console.log('Error!', error),
      () => this.getAllUserByPage()
      );
    this.formUser.reset();
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

  remove(id: string) {
    this.dSub = this.userService.removeUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.getAllUserByPage();
    });
    console.log('Deleted user');
  }

  findUserByUsername(event: Event) {
    const username = (event.target as HTMLInputElement).value;
    if (username.trim() === '') {
      this.getAllUserByPage();
    } else {
      this.userService.searchUserByUsername(username, this.pageNumber, this.pageSize).subscribe(
        data => {
          const userList: User[] = data[`content`];
          const totalElements = new Array(data[`totalElements`]);
          this.dataSource = new MatTableDataSource<User>(userList);
          this.paginator.length = totalElements.length;
          console.log('Find users');
        },
        error => console.log('Error!', error)
      );
    }
  }

  findUserByEmail(event: Event) {
    const email = (event.target as HTMLInputElement).value;
    if (email.trim() === '') {
      this.getAllUserByPage();
    } else {
      this.userService.searchUserByEmail(email, this.pageNumber, this.pageSize).subscribe(
        data => {
          const userList: User[] = data[`content`];
          const totalElements = new Array(data[`totalElements`]);
          this.dataSource = new MatTableDataSource<User>(userList);
          this.paginator.length = totalElements.length;
          console.log('Find users');
        },
        error => console.log('Error!', error)
      );
    }
  }

  findUserByPhoneNumber(event: Event) {
    const phone = (event.target as HTMLInputElement).value;
    if (phone.trim() === '') {
      this.getAllUserByPage();
    } else {
      this.userService.searchUserByPhoneNumber(phone, this.pageNumber, this.pageSize).subscribe(
        data => {
          const userList: User[] = data[`content`];
          const totalElements = new Array(data[`totalElements`]);
          this.dataSource = new MatTableDataSource<User>(userList);
          this.paginator.length = totalElements.length;
          console.log('Find users');
        },
        error => console.log('Error!', error)
      );
    }
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getAllUserByPage();
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

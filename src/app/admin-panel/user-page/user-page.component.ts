import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {User} from '../component/Users';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogWindowEditUserComponent} from './edit-user-window/dialog-window-edit-user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RemoveUserWindowComponent} from './remove-user-window/remove-user-window.component';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  users: User[];
  pageNumber = 0;
  pageSize = 5;
  formUser: FormGroup;
  vSub: Subscription;
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', 'role', 'edit', 'button'];
  dataSource = new MatTableDataSource<User>();

  constructor(private snackBar: MatSnackBar, public userService: UserService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAllUserByPage();
    this.formUser = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')
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
    if (this.formUser.invalid) {
      console.log('Date is invalid');
      return;
    }
    this.vSub = this.userService.createUser(this.formUser.value)
      .subscribe(() => {
        this.getAllUserByPage();
        this.snackBar.open('User was created successfully !', 'close', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['snackbar']
          });
      });
  }

  reset() {
    this.formUser.reset();
  }

  getAllUserByPage() {
    this.vSub = this.userService.getAllUserByPage(this.pageNumber, this.pageSize)
      .subscribe(data => {
        const listUsers = data[`content`];
        const totalElements = new Array(data[`totalElements`]);
        this.users = listUsers;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.paginator.length = totalElements.length;
      });
    console.log('Get users');
  }

  findUserByUsername(event: Event) {
    const username = (event.target as HTMLInputElement).value;
    if (username.trim() === '') {
      this.getAllUserByPage();
    } else {
      this.vSub = this.userService.searchUserByUsername(username, this.pageNumber, this.pageSize).subscribe(
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
      this.vSub = this.userService.searchUserByEmail(email, this.pageNumber, this.pageSize).subscribe(
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
      this.vSub = this.userService.searchUserByPhoneNumber(phone, this.pageNumber, this.pageSize).subscribe(
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

  openDialogEdit(element) {
    console.log('Opened edit form');
    const dialogRef = this.dialog.open(DialogWindowEditUserComponent, {
      data: element
    });
    this.vSub = dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getAllUserByPage();
    });
  }

  openDialogRemove(element) {
    console.log('Opened remove operation');
    const dialogRef = this.dialog.open(RemoveUserWindowComponent, {
      data: element
    });
    this.vSub = dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getAllUserByPage();
    });
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    console.log('Finished destroy');
  }
}

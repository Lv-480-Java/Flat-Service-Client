import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  photoUrl: string;
}

@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.scss']
})
export class ListUserPageComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'password', 'phone'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.addUser();
  }

  addUser() {
    this.userService.addUser()
      .subscribe(user => {
        this.users = user;
      });
  }
}

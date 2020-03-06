import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {User} from '../component/interfaces';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.scss']
})
export class ListUserPageComponent implements OnInit, OnDestroy {
  users: User[];
  vSub: Subscription;
  dSub: Subscription;
  form: FormGroup;

  displayedColumns: string[] = ['id', 'username', 'email', 'password', 'phone', 'photo', 'edit', 'button'];
  dataSource: MatTableDataSource<User>;

  constructor(private userService: UserService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.vSub = this.userService.getAllUser()
      .subscribe(user => {
        this.users = user;
        this.dataSource = new MatTableDataSource<User>(user);
      });
    setTimeout(() => this.dataSource.paginator = this.paginator);

    // this.form = new FormGroup( {
    //   username: new FormGroup(null, Validators.required),
    //   email: new FormGroup(null, Validators.required),
    //   password: new FormGroup(null, Validators.required),
    //   phoneNumber: new FormGroup(null, Validators.required),
    // });
  }

  create() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      phoneNumber: this.form.value.phoneNumber
    };
    this.userService.createUser(user).subscribe(() => {
      this.form.reset();
    });
  }

  remove(id: string) {
    this.dSub = this.userService.removeUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsForUserVerification} from '../entity/request-for-user-verification';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-renter-requests',
  templateUrl: './renter-requests.component.html',
  styleUrls: ['./renter-requests.component.scss']
})
export class RenterRequestsComponent implements OnInit {

  requests: RequestsForUserVerification[];

  displayedColumns: string[] = ['id', 'author', 'date', 'review', 'approve', 'decline'];
  dataSource: MatTableDataSource<RequestsForUserVerification>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getRenterRequests()
      .subscribe(request => {
        this.requests = request;
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(request);
      });
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  review(id: string) {
    window.location.href = ('http://localhost:4200/profile');
  }

  decline(id: number) {
    this.adminService.declineUserRequests(id)
      .subscribe(() => {
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(this.requests);
      });
    window.location.href = ('http://localhost:4200/admin/requests/moderators');
  }

  approve(id: number) {
    this.adminService.approveUserRequests(id)
      .subscribe(() => {
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(this.requests);
      });
    window.location.href = ('http://localhost:4200/admin/requests/moderators');
  }

}

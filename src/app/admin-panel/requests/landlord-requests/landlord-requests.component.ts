import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AdminService} from '../../../services/admin.service';
import {RequestsForUserVerification} from '../entity/request-for-user-verification';

@Component({
  selector: 'app-landlord-requests',
  templateUrl: './landlord-requests.component.html',
  styleUrls: ['./landlord-requests.component.scss']
})
export class LandlordRequestsComponent implements OnInit {

  requests: RequestsForUserVerification[];
  vSub: Subscription;
  aSub: Subscription;
  dSub: Subscription;

  displayedColumns: string[] = ['id', 'date', 'review'];
  dataSource: MatTableDataSource<RequestsForUserVerification>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.vSub = this.adminService.getLandlordRequests()
      .subscribe(request => {
        this.requests = request;
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(request);
      });
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  review(id: string) {

  }

  decline(id: number) {
    this.dSub = this.adminService.declineUserRequests(id)
      .subscribe(request => {
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(this.requests);
      });
  }

  approve(id: number) {
    this.aSub = this.adminService.approveUserRequests(id)
      .subscribe(request => {
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(this.requests);
      });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsForFlatVerification} from '../entity/requests-for-flat-verification';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../../../services/admin.service';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {RequestsForUserVerification} from '../entity/request-for-user-verification';

@Component({
  selector: 'app-flat-requests',
  templateUrl: './flat-requests.component.html',
  styleUrls: ['./flat-requests.component.scss']
})
export class FlatRequestsComponent implements OnInit {
  requests: RequestsForFlatVerification[];
  vSub: Subscription;
  aSub: Subscription;
  dSub: Subscription;


  displayedColumns: string[] = ['id', 'author', 'date', 'review', 'approve', 'decline'];
  dataSource: MatTableDataSource<RequestsForFlatVerification>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.vSub = this.adminService.getFlatRequests()
      .subscribe(request => {
        console.log(request);
        this.requests = request;
        this.dataSource = new MatTableDataSource<RequestsForFlatVerification>(request);
      });
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  review(id: string) {
    window.location.href = ('http://localhost:4200/');
  }

  decline(id: number) {
    this.adminService.declineFlatRequests(id)
      .subscribe(request => {
        this.dataSource = new MatTableDataSource<RequestsForFlatVerification>(this.requests);
      });
    window.location.href = ('http://localhost:4200/admin/requests/flats');

  }

  approve(id: number) {
    this.adminService.approveFlatRequests(id)
      .subscribe(request => {
        this.dataSource = new MatTableDataSource<RequestsForFlatVerification>(this.requests);
      });
    window.location.href = ('http://localhost:4200/admin/requests/flats');

  }

}

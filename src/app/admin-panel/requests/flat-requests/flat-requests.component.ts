import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsForFlatVerification} from '../entity/requests-for-flat-verification';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../../../services/admin.service';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

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


  displayedColumns: string[] = ['id', 'date', 'review'];
  dataSource: MatTableDataSource<RequestsForFlatVerification>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.vSub = this.adminService.getFlatRequests()
      .subscribe(request => {
        this.requests = request;
        this.dataSource = new MatTableDataSource<RequestsForFlatVerification>(request);
      });
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  review(id: string) {

  }

  decline(id: number) {
    this.dSub = this.adminService.declineFlatRequests(id)
      .subscribe(request => {
        this.dataSource = new MatTableDataSource<RequestsForFlatVerification>(this.requests);
      });
  }

  approve(id: number) {
    this.aSub = this.adminService.approveFlatRequests(id)
      .subscribe(request => {
        this.dataSource = new MatTableDataSource<RequestsForFlatVerification>(this.requests);
      });
  }

}

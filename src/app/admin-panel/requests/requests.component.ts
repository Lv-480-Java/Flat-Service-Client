import {Component, OnInit, DoCheck} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {RequestsForFlatVerification} from './entity/requests-for-flat-verification';
import {User} from '../component/Users';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit, DoCheck {
  labelsTypes = [{label: 'For Flat Publication', type: 'FLATS'},
    {label: 'For Renter Verification', type: 'RENTERS'},
    {label: 'For Landlord Verification', type: 'LANDLORDS'},
    {label: 'For Moderator Verification', type: 'MODERATORS'}];

  displayedColumns: string[] = ['id', 'author', 'date', 'review'];
  dataSource;

  statuses = ['ALL', 'VERIFYING', 'APPROVED', 'DECLINED'];
  label: string;
  type: string;
  status: string;

  requests;
  pageNumber = 0;
  pageSize = 5;
  private paginator: any;


  constructor(private adminService: AdminService) {
  }

  ngDoCheck(): void {
    console.log('check');
    this.label = this.labelsTypes.find(x => x.type === this.type).label;
    // this.getRequestsByPage();
  }


  ngOnInit(): void {
    this.label = this.labelsTypes[0].label;
    this.type = this.labelsTypes[0].type;
    this.status = this.statuses[0];

    this.getRequestsByPage();

  }

  getRequestsByPage() {
    this.adminService.getRequests(this.pageNumber, this.pageSize, this.type, this.status)
      .subscribe(data => {
        const totalElements = new Array(data[`totalElements`]);
        this.requests = data[`content`];
        this.dataSource = new MatTableDataSource<User>(this.requests);
        this.paginator.length = totalElements.length;
      });
    console.log('Get users');
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getRequestsByPage();
  }

  review(id: any) {

  }

  approve(id: any) {

  }

  decline(id: any) {

  }
}


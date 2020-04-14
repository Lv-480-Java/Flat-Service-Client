import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../services/requests.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private requestsService: RequestsService) {
  }

  newRequests: number;

  ngOnInit(): void {
    this.requestsService.getNewRequests().subscribe(data => {
      this.newRequests = data;
    });
  }
}

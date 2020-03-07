import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {


  ngOnInit(): void {
  }


}

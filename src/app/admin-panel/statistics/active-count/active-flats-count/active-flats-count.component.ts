import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../../../services/statistics.service';
import {FlatStatisticsService} from '../../../../services/statistics/flat-statistics.service';

@Component({
  selector: 'app-active-flats-count',
  templateUrl: './active-flats-count.component.html',
  styleUrls: ['./active-flats-count.component.scss']
})
export class ActiveFlatsCountComponent implements OnInit {

  countFlats: number;

  constructor(private flatStatisticsService: FlatStatisticsService) {
  }

  ngOnInit(): void {
    this.flatStatisticsService.countActiveFlats().subscribe(count => {
      this.countFlats = count;
    });
  }
}


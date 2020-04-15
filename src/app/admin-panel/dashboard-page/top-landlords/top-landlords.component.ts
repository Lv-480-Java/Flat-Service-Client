import {Component, OnInit} from '@angular/core';
import {User} from '../../component/Users';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserStatisticsService} from '../../../services/statistics/user-statistics.service';
import {FlatStatisticsService} from '../../../services/statistics/flat-statistics.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-top-landlords',
  templateUrl: './top-landlords.component.html',
  styleUrls: ['./top-landlords.component.scss']
})
export class TopLandlordsComponent implements OnInit {

  commitments = [];
  topLandlords: Array<User>;
  data = new Array();
  periods = ['All time', 'Year', '3 Months'];
  periodForm: FormGroup;

  constructor(private userStatisticsService: UserStatisticsService,
              private flatStatisticsService: FlatStatisticsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.setPeriod(this.periods[0]);
    this.loadLandlords();
  }

  loadLandlords() {
    this.userStatisticsService.getTopLandlords(6).subscribe(landlords => {

      this.topLandlords = landlords;
      for (let i = 0; i < 6; i++) {
        this.data.push({landlord: this.topLandlords[i], flats: 0, commitments: 0});
      }
      for (let i = 0; i < 6; i++) {
        const id = this.topLandlords[i].id;
        forkJoin([
          this.flatStatisticsService.getFlatsOfLandlord(id),
          this.userStatisticsService.getCommitmentsOfLandlord(id)
        ]).subscribe(count => {
          this.data[i].flats = count[0];
          this.data[i].commitments = count[1];
        });
      }
      console.log('commitments', this.commitments);
    });
  }

  setPeriod(period) {
    this.periodForm = this.formBuilder.group({periodForm: [null]});
    this.periodForm.get('periodForm').setValue(period);
  }

  onChangePeriod(value) {
  }
}

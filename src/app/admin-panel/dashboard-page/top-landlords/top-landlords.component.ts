import {Component, OnInit} from '@angular/core';
import {User} from '../../component/Users';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserStatisticsService} from '../../../services/statistics/user-statistics.service';
import {FlatStatisticsService} from '../../../services/statistics/flat-statistics.service';

@Component({
  selector: 'app-top-landlords',
  templateUrl: './top-landlords.component.html',
  styleUrls: ['./top-landlords.component.scss']
})
export class TopLandlordsComponent implements OnInit {

  commtments = [8, 7, 4, 4, 3, 2];
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
        this.data.push({landlord: this.topLandlords[i], flats: 0, commitments: this.commtments[i]});
      }
      for (let i = 0; i < 6; i++) {
        const id = this.topLandlords[i].id;
        this.flatStatisticsService.getFlatsOfLandlord(id).subscribe(count => {
          this.data[i].flats = count;
        });
      }
      console.log('data', this.data);
    });
  }

  setPeriod(period) {
    this.periodForm = this.formBuilder.group({periodForm: [null]});
    this.periodForm.get('periodForm').setValue(period);
  }

  onChangePeriod(value) {
  }
}

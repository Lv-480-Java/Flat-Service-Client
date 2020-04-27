import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  url = 'src/assets/our_team.jpeg';

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {Component, OnInit} from '@angular/core';
import {MouseEvent} from '@agm/core';
import {BASE_URL} from 'src/app/utils/constants';
import {HttpClient} from '@angular/common/http';
import {Router, RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'app-flat-map',
  templateUrl: './flat-map.component.html',
  styleUrls: ['./flat-map.component.scss']
})
export class FlatMapComponent implements OnInit {

  zoom = 13;
  lat = 49.838935;
  lng = 24.0280469;

  markers: marker[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.loadLocations();
  }

  clickedMarker(label: string, index: number) {
    this.router.navigate(['detailed/', this.markers[index].flatId ]);
    console.log(`clicked the marker: ${label || index}`);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  loadLocations() {
    this.http.get(BASE_URL + 'map/')
      .subscribe(data => {
        const bufer: any = data;
        this.markers = this.markers.concat(bufer);
        console.log(this.markers);
      });
  }
}

interface marker {
  flatId: number;
  latitude: number;
  longitude: number;
  description?: string;
  draggable: boolean;
}

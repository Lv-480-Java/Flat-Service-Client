import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import {FlatDetailed} from '../../../../flat/flat-detailed/entity/FlatDetailed';
import {BASE_URL} from 'src/app/utils/constants';


@Component({
  selector: 'app-flat-request-detail',
  templateUrl: './flat-request-detail.component.html',
  styleUrls: ['./flat-request-detail.component.scss']
})
export class FlatRequestDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  images: GalleryItem[];
  @Input() id: number;
  data: any;
  public flatDetailed: FlatDetailed = new FlatDetailed();

  ngOnInit(): void {
    this.loadFlat();
  }

  loadFlat(): void {
    const c = BASE_URL + 'flat/' + this.id;
    console.log(c);
    this.http.get(c)
      .subscribe(data => {
        this.data = data;
        this.flatDetailed = this.data;
        this.loadImages();
      });
  }

  loadImages(): void {
    this.images = [];
    this.flatDetailed.photos.forEach((value) => {
      this.images.push(new ImageItem({
        src: value,
        thumb: value
      }));
    });
  }

}

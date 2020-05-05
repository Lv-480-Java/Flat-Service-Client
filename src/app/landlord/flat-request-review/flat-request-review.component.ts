import {Component, Input, OnInit} from '@angular/core';
import {GalleryItem, ImageItem} from "@ngx-gallery/core";
import {FlatDetailed} from "../../flat/flat-detailed/entity/FlatDetailed";
import {BASE_URL} from 'src/app/utils/constants';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-flat-request-review',
  templateUrl: './flat-request-review.component.html',
  styleUrls: ['./flat-request-review.component.scss']
})
export class FlatRequestReviewComponent implements OnInit {

  images: GalleryItem[];
  @Input() id: number;
  data: any;
  public flatDetailed: FlatDetailed = new FlatDetailed();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadFlat();
  }

  loadFlat(): void {
    const c = BASE_URL + 'flat/' + this.id;
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

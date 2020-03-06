import {Component, OnInit} from '@angular/core';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';

@Component({
  selector: 'app-flat-detailed',
  templateUrl: './flat-detailed.component.html',
  styleUrls: ['./flat-detailed.component.scss']
})
export class FlatDetailedComponent implements OnInit {

  constructor() {
  }


  images: GalleryItem[];

  ngOnInit(): void {
    this.images = [
      // tslint:disable-next-line:max-line-length
      new ImageItem({src: 'https://www.thebigflatbarcelona.com/wp-content/uploads/2016/12/bigflathomebarcelona.jpg', thumb: 'IMAGE_THUMBNAIL_URL'}),
      new ImageItem({src: 'https://www.thebigflatbarcelona.com/wp-content/uploads/2016/12/MG_8339-e1542377773910.jpg', thumb: 'IMAGE_THUMBNAIL_URL'}),
      new ImageItem({src: 'https://www.thebigflatbarcelona.com/wp-content/uploads/2016/12/full-yellow-e1542377993284.jpg', thumb: 'IMAGE_THUMBNAIL_URL'}),
      new ImageItem({src: 'https://www.thebigflatbarcelona.com/wp-content/uploads/2016/12/BARCELONA-FLAT-RAVAL00227.jpg', thumb: 'IMAGE_THUMBNAIL_URL'})
    ];
}

}

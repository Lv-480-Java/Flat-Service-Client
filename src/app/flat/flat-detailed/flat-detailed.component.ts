import {Component, OnInit} from '@angular/core';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FlatDetailed} from './entity/FlatDetailed';
import {BASE_URL} from 'src/app/utils/constants';
import {User} from '../../admin-panel/component/Users';

@Component({
  selector: 'app-flat-detailed',
  templateUrl: './flat-detailed.component.html',
  styleUrls: ['./flat-detailed.component.scss']
})
export class FlatDetailedComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  images: GalleryItem[];
  public id: number;
  data: any;
  public flatDetailed: FlatDetailed = new FlatDetailed();
  userData: User;
  chatIsActive = false;

  activateChat() {
    if (this.chatIsActive === false) {
      this.chatIsActive = true;
    } else {
      this.chatIsActive = false;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
    this.loadFlat();
  }

  loadFlat(): void {
    const url = BASE_URL + 'flat/' + this.id;
    this.http.get(url)
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

  modalClosed(isClosed) {
    this.chatIsActive = false;
  }
}

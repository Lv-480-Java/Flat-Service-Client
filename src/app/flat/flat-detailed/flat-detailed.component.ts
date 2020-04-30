import {Component, OnInit} from '@angular/core';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FlatDetailed} from './entity/FlatDetailed';
import {BASE_URL} from 'src/app/utils/constants';
import {User} from '../../admin-panel/component/Users';
import {FlatBookingService} from "../../services/flat-booking.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RequestForFlatBooking, RequestsForFlatBooking} from "../../renter/entity/request-for-flat-booking";

@Component({
  selector: 'app-flat-detailed',
  templateUrl: './flat-detailed.component.html',
  styleUrls: ['./flat-detailed.component.scss']
})
export class FlatDetailedComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient,
              private flatBookingService: FlatBookingService,
              private bar: MatSnackBar) {
  }

  images: GalleryItem[];
  public id: number;
  data: any;
  public flatDetailed: FlatDetailed = new FlatDetailed();
  userData: User;
  chatIsActive = false;
  data_r: any;
  status: string;
  requests: RequestsForFlatBooking = new RequestsForFlatBooking();
  request: RequestForFlatBooking = new RequestForFlatBooking();
  private flag: boolean;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
    this.loadFlat();
    this.loadRenterRequests();
  }

  activateChat() {
    if (this.chatIsActive === false) {
      this.chatIsActive = true;
    } else {
      this.chatIsActive = false;
    }
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

  bookApartment(id: number) {
    this.flatBookingService.bookApartment(id).subscribe(
      success => {
        this.bar.open("Your request was successfully sent to Landlord!", "x",
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      },
      error => {
        this.bar.open(error.error.message, "x",
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar']
          });
      }
    );
  }

  getUserRole() {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      return JSON.parse(localStorage.getItem('user')).role;
    }
  }

  getUserName() {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      return JSON.parse(localStorage.getItem('user')).username;
    }
  }

  loadRenterRequests() {
    this.flatBookingService.getRenterRequests()
      .subscribe(data => {
        this.data_r = data;
        this.requests.content = this.data_r;
      });
  }

  getStatusOfRequest() {
    if (this.requests.content === undefined) {
      return false;
    }
    this.request = this.requests.content.find(value => {
      if (value.flat.id === this.id) {
        this.status = value.status;
        return value;
      } else {
        return null;
      }
    })
  }

  isRequestApproved() {
    if (this.requests.content === undefined) {
      return false;
    }
    this.request = this.requests.content.find(value => {
      if (value.flat.id === this.id) {
        return value;
      } else {
        return null;
      }
    })

    if (this.request === null || this.request === undefined) {
      return false;
    }

    if ((this.getUserName() === this.request.author.username) && (this.request.status === 'APPROVED')) {
      return true;
    } else {
      return false;
    }
  }

}

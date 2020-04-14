import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FlatBookingService} from "../services/flat-booking.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  chatListIsActive: boolean;
  newRequests: number;

  constructor(public authService: AuthService, private bookingService: FlatBookingService) {
  }

  ngOnInit(): void {
    this.bookingService.getNewLandlordRequests().subscribe(data => {
      this.newRequests = data;
    });
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  displayName() {
    return JSON.parse(localStorage.getItem('user')).username;
  }

  displayRole() {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      return JSON.parse(localStorage.getItem('user')).role;
    }
  }

  activateChat() {
    if (this.chatListIsActive === false) {
      this.chatListIsActive = true;
    } else {
      this.chatListIsActive = false;
    }
  }

}

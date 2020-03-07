import {Component, OnInit} from '@angular/core';
import {decode} from 'jsonwebtoken';
import {tryCatch} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  isAuthenticated(): boolean {
    function parseJwt (token) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    };
    // let decoded = decode(this.getCookie('token') );
    // console.log(decoded)
    if (this.getCookie('token') !== undefined) {
      console.log(parseJwt(this.getCookie('token')))
    }
    return this.getCookie('token') !== undefined;
  }

  getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

}

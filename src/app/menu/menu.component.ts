import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  /* isAuthenticated(): boolean {
     function parseJwt(token) {
       const base64Url = token.split('.')[1];
       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
       // tslint:disable-next-line:only-arrow-functions
       const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
       }).join(''));

       return JSON.parse(jsonPayload);
     }
     // let decoded = decode(this.getCookie('token') );
     // console.log(decoded)
     if (this.getCookie('token') !== undefined) {
       console.log(parseJwt(this.getCookie('token')));
     }
     return this.getCookie('token') !== undefined;
   }

   getCookie(name) {
     const matches = document.cookie.match(new RegExp(
       '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
     ));
     return matches ? decodeURIComponent(matches[1]) : undefined;
   }*/

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  displayName(){
    return JSON.parse(localStorage.getItem("user")).username;
  }
}

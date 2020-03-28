import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageUser} from '../shared/localStorageUser';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private currentUserSubject: BehaviorSubject<LocalStorageUser>;
  private readonly ACCESS_TOKEN = 'accesstoken';
  private readonly REFRESH_TOKEN = 'refreshtoken';
  private readonly CURRENT_USER = 'user';
  constructor() {
    this.currentUserSubject = new BehaviorSubject<LocalStorageUser>(JSON.parse(localStorage.getItem(this.CURRENT_USER)));
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public setAccessToken(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }


  public getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  public get getCurrentUser(): LocalStorageUser {
    return this.currentUserSubject.value;
  }

  public clear(): void {
    localStorage.clear();
  }

}

import { Injectable } from '@angular/core';
import {HttpServiceService} from "./http-service.service";
import {Token} from "../interface/token";
import {HttpErrorResponse} from "@angular/common/http";
import {Login} from "../interface/login";
import {BehaviorSubject, tap} from "rxjs";
import {User} from "../interface/user";
import {tokenGetter} from "../app.module";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user: User | null;
  constructor(private httpService: HttpServiceService, private jwt: JwtHelperService) {
    const token = localStorage.getItem("access_token");
    this._isLoggedIn$.next(!!token);
    this.user = this.getUser(token);
  }

  login(login: Login){
    return this.httpService.login(login).pipe(tap((response: Token) => {
      this._isLoggedIn$.next(true);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      this.user = this.getUser(response.access_token)
    }))
  }

  logout(){
    this._isLoggedIn$.next(false);
    localStorage.clear();
    this.user = null;
  }

  private getUser(token: string | null): User | null{
    if (!token){
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";
import {UserRecovery} from "../models/user-recovery";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private user: User;

  constructor(
    private http: HttpClient
  ) { }

  public login(user: any)
  {
    return this.http.post(`${environment.api.url}login`, user)
      .pipe(map((user: any) =>
      {
        this.token = user.token;
        this.user = user;

        localStorage.setItem('token', this.token);

        return user;
      }));
  }

  public logout()
  {
    localStorage.clear();
  }

  public recoverPassword(recovery: UserRecovery)
  {
    return this.http.post(`${environment.api.url}users/recovery`, recovery);
  }

  public forgotPassword(user: User)
  {
    return this.http.post(`${environment.api.url}users/forget`, user);
  }

  public validateEmail(user: User)
  {
    return this.http.post(`${environment.api.url}users/validate`, user);
  }

  public getUser()
  {
    return this.user;
  }
}

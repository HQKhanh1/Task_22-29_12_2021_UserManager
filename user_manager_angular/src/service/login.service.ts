import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../app/model/user';
export class UserLogin {
  constructor(public status: string) {}
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private nowHttpOption = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  constructor(private httpClient: HttpClient) {}

  public authenticate(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.httpClient
      .get<any>('http://localhost:8080/user/login', {
        headers,
        responseType: 'json',
      });
  }
  public findUsersByEmail(email: string) {
    return this.httpClient.get<any>(
      'http://localhost:8080/user/checkemail/' + email
    );
  }
  public changePassUserThenForgotPass(user: User) {
    return this.httpClient.post<any>(
      'http://localhost:8080/user/changePassForgot',
      JSON.stringify(user),
      this.nowHttpOption
    );
  }
  public isUserLoggedIn(): boolean {
    return !sessionStorage.getItem('basicauth') ? false : true;
  }
  public logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('basicauth');
    sessionStorage.removeItem('rolename');
  }
}

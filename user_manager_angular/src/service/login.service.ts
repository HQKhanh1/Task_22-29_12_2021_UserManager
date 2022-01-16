import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
    console.log(username);
    console.log(password);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.httpClient
      .get<any>('http://localhost:8080/user/login', {
        headers,
        responseType: 'json',
      })
      .pipe(
        map((userData) => {
          console.log('userData: ', userData);
          return userData;
        })
      );
  }
  public findUsersByEmail(email: string) {
    console.log(
      'API EMAIL: ',
      'http://localhost:8080/user/checkemail/' + email
    );
    return this.httpClient.get<any>(
      'http://localhost:8080/user/checkemail/' + email
    );
  }
  public changePassUserThenForgotPass(user: User) {
    console.log('Json USER: ', JSON.stringify(user));
    return this.httpClient.post<any>(
      'http://localhost:8080/user/changePassForgot',
      JSON.stringify(user), this.nowHttpOption
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

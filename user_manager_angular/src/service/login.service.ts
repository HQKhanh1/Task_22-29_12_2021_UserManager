import { User } from './../app/model/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
export class UserLogin {
  constructor(public status: string) {}
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string) {
    console.log(username);
    console.log(password);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.httpClient
      .get<any>('http://localhost:8080/user/login', {
        headers,
        responseType: 'text' as 'json',
      })
      .pipe(
        map((userData) => {

          sessionStorage.setItem('username', username);

          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
          console.log('info login: ', userData);
          console.log('Token login: ', authString);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let basicauth = sessionStorage.getItem('basicauth');
    // console.log("basicauth Login: ", basicauth);
    return !(basicauth === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('basicauth');
  }
}

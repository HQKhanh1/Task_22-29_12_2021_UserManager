import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';
export class UserLogin {
  constructor(public status: string) {}
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string): Observable<any> {
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
          console.log('userData: ', userData)
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    return !(sessionStorage.getItem('basicauth') === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('basicauth');
    sessionStorage.removeItem('rolename');
  }
}

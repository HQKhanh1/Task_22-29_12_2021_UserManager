import { User } from './../app/model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  private REST_API_SERVER = 'http://localhost:8080/user';
  public headers: any | null = sessionStorage.getItem('basicauth');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.headers,
    }).set('Content-Type', 'application/json'),
  };
  private nowHttpOption = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  constructor(private httpClient: HttpClient) {}
  public getAllUser(index: number): Observable<any> {
    this.headers = sessionStorage.getItem('basicauth');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    console.log('header trong lay page: ', this.headers);
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/page?pageSize=5&pageNo=' + index,
      this.httpOptions
    );
  }

  public getAllUserNotPagination(): Observable<any> {
    this.headers = sessionStorage.getItem('basicauth');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/user-not-pagination',
      this.httpOptions
    );
  }
  public search(
    username: string,
    firstname: string,
    lastname: string,
    email: string
  ): Observable<any> {
    this.headers = sessionStorage.getItem('basicauth');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.get<any>(
      this.REST_API_SERVER +
        '/mapsearch?username=' +
        username +
        '&firstname=' +
        firstname +
        '&lastname=' +
        lastname +
        '&email=' +
        email,
      this.httpOptions
    );
  }
  public getUserByUsername(username: string): Observable<any> {
    if (!this.headers) {
      this.headers = sessionStorage.getItem('basicauth');
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: this.headers,
        }).set('Content-Type', 'application/json'),
      };
      console.log('lay trong http service: ', this.headers);
    } else {
      this.headers = sessionStorage.getItem('basicauth');
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: this.headers,
        }).set('Content-Type', 'application/json'),
      };
    }
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/finduser/' + username,
      this.httpOptions
    );
  }
  public updatePassword(username: string, password: User): Observable<any> {
    console.log('API USER: ', JSON.stringify(password));
    this.headers = sessionStorage.getItem('basicauth');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.put<any>(
      this.REST_API_SERVER + '/change/' + username,
      password,
      this.httpOptions
    );
  }
  public update(user: User): Observable<any> {
    console.log('API USER: ', JSON.stringify(user));
    this.headers = sessionStorage.getItem('basicauth');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.put<any>(
      this.REST_API_SERVER + '/' + user.username,
      JSON.stringify(user),
      this.httpOptions
    );
  }
  public delete(user: User): Observable<any> {
    console.log('url: ', this.REST_API_SERVER + '/' + user.username);
    this.headers = sessionStorage.getItem('basicauth');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.delete<any>(
      this.REST_API_SERVER + '/' + user.username,
      this.httpOptions
    );
  }
  public signUpUser(user: User): Observable<any> {
    console.log('API USER: ', JSON.stringify(user));
    console.log('Heloo dang ki chua xong dau ne: ');

    return this.httpClient.post<any>(
      this.REST_API_SERVER + '/signup',
      JSON.stringify(user),
      this.nowHttpOption
    );
  }
  public sendMail(user: User): Observable<any> {
    console.log('API USER: ', JSON.stringify(user));
    console.log('Heloo dang ki chua xong dau ne: ');
    return this.httpClient
      .post<any>(
        this.REST_API_SERVER + '/sendmail',
        JSON.stringify(user),
        this.nowHttpOption
      )
      .pipe(
        map((userData) => {
          console.log('userData: ', userData);
          return userData;
        })
      );
  }
}

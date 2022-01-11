import { User } from './../app/model/user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  private REST_API_SERVER = 'http://localhost:8080/user';
  headers: any = sessionStorage.getItem('basicauth');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.headers,
    }).set('Content-Type', 'application/json'),
  };
  constructor(private httpClient: HttpClient) {}
  public getAllUser(index: number): Observable<any> {
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/page?pageSize=5&pageNo=' + index,
      this.httpOptions
    );
  }

  public getAllUserNotPagination(): Observable<any> {
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
    return this.httpClient.get<any>(
      this.REST_API_SERVER +
        '/mapsearch?username=' +
        username +
        '&firstname=' +
        firstname +
        '&lastname=' +
        lastname +
        '&email=' +
        email
    );
  }
  public getCustomHeaders(): HttpHeaders {
    const headers = new HttpHeaders();

    return headers;
  }
  public getUserByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/' + username,
      this.httpOptions
    );
  }
  public update(user: User): Observable<HttpResponse<any>> {
    console.log('API USER: ', JSON.stringify(user));
    return this.httpClient.put<any>(
      this.REST_API_SERVER + '/' + user.username,
      JSON.stringify(user),
      this.httpOptions
    );
  }
  public delete(user: User): Observable<any> {
    console.log('url: ', this.REST_API_SERVER + '/' + user.username);
    return this.httpClient.delete<any>(
      this.REST_API_SERVER + '/' + user.username,
      this.httpOptions
    );
  }
  public signUpUser(user: User): Observable<HttpResponse<any>> {
    console.log('API USER: ', JSON.stringify(user));
    return this.httpClient.post<any>(
      this.REST_API_SERVER,
      JSON.stringify(user),
      this.httpOptions
    );
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 400) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `,
  //       error.error
  //     );
  //   }
  //   // Return an observable with a user-facing error message.
  //   return new Error('Something bad happened; please try again later.');
  // }
}

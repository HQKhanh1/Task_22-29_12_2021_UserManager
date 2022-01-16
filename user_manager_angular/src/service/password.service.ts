import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  getHeader: any = sessionStorage.getItem('basicauth');
  constructor(private httpClient: HttpClient) {}
  checkPass(username: string, password: string) : any {
    const headers = new HttpHeaders({
      Authorization: this.getHeader,
    });
    return this.httpClient
      .get<any>(
        'http://localhost:8080/user/check/' + username + '/' + password,
        {
          headers,
          responseType:'json',
        }
      )
      .pipe(
        map((userData:boolean) => {
          console.log('Check Passssss: ', userData);
          return userData;
        })
      );
  }
}

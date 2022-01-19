import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { HttpServiceService } from '../../service/http-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  public formLogin: FormGroup = new FormGroup({});
  constructor(
    private router: Router,
    private loginService: LoginService,
    private http: HttpServiceService
  ) {}
  inValidLogin: any = '';
  username: string = '';
  password: string = '';
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  checkLogin() {
    this.submitted = true;

    if (this.formLogin.valid) {
      this.username = this.formLogin.value.username;
      this.password = this.formLogin.value.password;


      this.loginService
        .authenticate(
          this.formLogin.value.username,
          this.formLogin.value.password
        )
        .subscribe(
          (data) => {
            if (data) {
              let authString =
                'Basic ' + btoa(this.username + ':' + this.password);
              sessionStorage.setItem('username', this.username);
              sessionStorage.setItem('basicauth', authString);
              this.http
                .getUserByUsername(this.username)
                .subscribe((data: User) => {
                  sessionStorage.setItem('rolename', data.roleName);
                  if (data.roleName === 'ROLE_ADMIN') {
                    this.router.navigate(['home']);
                  } else {
                    this.router.navigate(['viewuser']);
                  }
                });
              this.inValidLogin = true;
            }
          },
          (error) => {
            this.inValidLogin = false;
          }
        );
    }
  }
}

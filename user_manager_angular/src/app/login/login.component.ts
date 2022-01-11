import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { UtilsService } from '../../service/utils.service';
import { HttpServiceService } from '../../service/http-service.service';

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
  inValidLogin: boolean = false;
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

      console.log('username: ', this.username);
      console.log('password: ', this.password);

      let loginnn = this.loginService
        .authenticate(
          this.formLogin.value.username,
          this.formLogin.value.password
        )
        .subscribe((data: any) => {
          if (data === 'true') {
            let authString =
              'Basic ' + btoa(this.username + ':' + this.password);
            // sessionStorage.removeItem('username');
            sessionStorage.setItem('username', this.username);
            // sessionStorage.removeItem('basicauth');
            sessionStorage.setItem('basicauth', authString);
            this.http.getUserByUsername(this.username).subscribe((data) => {
              // sessionStorage.removeItem('rolename');
              if (data.roleName && data.roleName == 'ROLE_ADMIN') {
                console.log('do admin roif ne', data.roleName);
                this.router.navigate(['home']);
              } else {
              }
            });
            this.inValidLogin = true;
          } else {
            this.inValidLogin = false;
          }
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  public formLogin: FormGroup = new FormGroup({});

  invalidLogin: boolean = false;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  checkLogin() {
    this.submitted = true;
    if (this.formLogin.valid) {
      console.log('username: ', this.formLogin.value.username);
      console.log('password: ', this.formLogin.value.password);

      let loginnn = this.loginService.authenticate(
        this.formLogin.value.username,
        this.formLogin.value.password
      );
      loginnn.subscribe(
        (data) => {
          this.router.navigate(['home']);
          this.invalidLogin = false;
        },
        (error) => {
          this.invalidLogin = true;
        }
      );
    }
  }
}

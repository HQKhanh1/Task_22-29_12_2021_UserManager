import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private loginservice: LoginService
  ) {}

  ngOnInit(): void {
    this.loginservice.logOut();
    this.router.navigate(['login']);
  }
}

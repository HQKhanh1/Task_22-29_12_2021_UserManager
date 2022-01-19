import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public username: string | null = sessionStorage.getItem('username');
  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }
  public loadHome(): any {
    if (sessionStorage.getItem('rolename') === 'ROLE_ADMIN') {
      if (location.href === 'http://localhost:4200/home') {
        location.reload();
      } else {
        this.router.navigate(['home']);
      }
    } else {
      if (location.href === 'http://localhost:4200/viewuser') {
        location.reload();
      } else {
        this.router.navigate(['viewuser']);
      }
    }
  }
  selectItem() {
    if (!this.username) {
      this.username = sessionStorage.getItem('username');
    }
    this.router.navigate(['info/' + this.username]);
  }
  changePass() {
    if (!this.username) {
      this.username = sessionStorage.getItem('username');
    }
    this.router.navigate(['checkpass/' + this.username]);
  }
  logout() {
    this.loginService.logOut();
    this.router.navigate(['login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username : string | null = sessionStorage.getItem('username');
  constructor(
    public loginService : LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  selectItem(){
    this.router.navigate(['info/'+ this.username]);
  }
  changePass(){
    this.router.navigate(['changepass/'+ this.username]);
  }
  logout(){
    this.loginService.logOut();
    this.router.navigate(['login']);
  }
}

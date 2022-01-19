import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  public loadAboutUs(){
    location.href = 'https://www.facebook.com/hqkhanh0405/';
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
}

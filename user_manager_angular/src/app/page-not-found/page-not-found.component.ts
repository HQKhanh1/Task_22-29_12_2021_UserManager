import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  public homepage() :string {
    console.log('role ne: ', sessionStorage.getItem('rolename'))
    if (sessionStorage.getItem('rolename') === 'ROLE_ADMIN') {
      return 'home';
    } else {
      return 'viewuser';
    }
  }
}

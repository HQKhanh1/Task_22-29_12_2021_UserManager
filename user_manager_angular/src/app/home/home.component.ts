import { Component, OnInit } from '@angular/core';

import { User } from '../model/user';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/service/http-service.service';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User[] = [];
  sortedData: User[] = [];
  public searchText: any;
  indexPagination: number = 1;
  public searchUser: FormGroup = new FormGroup({});
  listUserNotPagination: User[] = [];
  totalPagination: number = 0;
  searchResult: string = '';
  public submitted: any = '';
  min: number = 0;
  constructor(
    private httpServerService: HttpServiceService,
    private router: Router,

    private routerA: ActivatedRoute
  ) {
  }
  public ngOnInit() {
    if (this.routerA.snapshot.params['id']) {
      this.indexPagination = this.routerA.snapshot.params['id'];
    }
    this.httpServerService.getAllUserNotPagination().subscribe((data: any) => {
      this.listUserNotPagination = data;
      if (this.listUserNotPagination.length % 5 === 0) {
        this.totalPagination = this.listUserNotPagination.length / 5;
      } else if (this.listUserNotPagination.length % 5 != 0) {
        this.totalPagination =
          (this.listUserNotPagination.length -
            (this.listUserNotPagination.length % 5)) /
            5 +
          1;
      }
      if (this.totalPagination <= 0) {
        this.min = 0;
      } else {
        this.min = 1;
      }
    });
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.submitted = false;
        this.searchResult = '';
        this.user = data.users;
        this.sortedData = this.user.slice();
      });
    this.searchUser = new FormGroup({
      username: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
    });
  }

  public getValue(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }
  public search() {
    if (
      this.searchUser.value.username.length === 0 &&
      this.searchUser.value.firstname.length === 0 &&
      this.searchUser.value.lastname.length === 0 &&
      this.searchUser.value.email.length === 0
    ) {
      location.href;
      this.submitted = true;
      this.searchResult = 'No result found';
    } else {
      this.submitted = true;
      this.searchResult = '';
      this.httpServerService
        .search(
          this.searchUser.value.username,
          this.searchUser.value.firstname,
          this.searchUser.value.lastname,
          this.searchUser.value.email
        )
        .subscribe((data: any) => {
          this.user = data;
          this.sortedData = this.user.slice();
          if (this.user.length === 0) {
            this.searchResult = 'No result found';
          }
        });
    }
  }
  loadHome() {
    location.reload();
  }
  public findPaginnation() {
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.user = data.users;
        this.sortedData = this.user.slice();
      });
    this.router.navigate(['home', this.indexPagination]);
  }

  public indexPaginationChage(value: number) {
    this.indexPagination = value;
  }

  public firtPage() {
    this.indexPagination = 1;
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.user = data.users;
        this.sortedData = this.user.slice();
      });
    this.router.navigate(['home', this.indexPagination]);
  }

  public nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.totalPagination;
    }
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.user = data.users;
        this.sortedData = this.user.slice();
      });
    this.router.navigate(['home', this.indexPagination]);
  }

  public prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.totalPagination <= 0 && this.indexPagination <= 0) {
      this.indexPagination = 0;
    } else if (this.indexPagination <= 0) {
      this.indexPagination = 1;
    }
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.user = data.users;
        this.sortedData = this.user.slice();
      });
    this.router.navigate(['home', this.indexPagination]);
  }

  public lastPage() {
    this.indexPagination = this.totalPagination;
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.user = data.users;
        this.sortedData = this.user.slice();
      });
    this.router.navigate(['home', this.indexPagination]);
  }
  public delete(userDelete: User) {
    var result = confirm('Are you sure to delete this user?');
    if (result) {
      if (this.user.length === 1) {
        this.indexPagination = this.indexPagination - 1;
        this.totalPagination = this.totalPagination - 1;
        this.httpServerService.delete(userDelete).subscribe();
        this.httpServerService
          .getAllUser(this.indexPagination - 1)
          .subscribe((data: any) => {
            this.user = data.users;
            this.sortedData = this.user.slice();
          });
        this.router.navigate(['home', this.indexPagination]);
      } else {
        this.httpServerService.delete(userDelete).subscribe();
        window.location.reload();
        this.router.navigate(['home', this.indexPagination]);
      }
    }
  }
  showRole(rolename: string) {
    if (rolename === 'ROLE_ADMIN') {
      return 'Admin';
    } else {
      return 'User';
    }
  }
  sortData(sort: Sort) {
    const data = this.user.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username':
          return this.compare(a.username, b.username, isAsc);
        case 'firstname':
          return this.compare(a.firstname, b.firstname, isAsc);
        case 'lastname':
          return this.compare(a.lastname, b.lastname, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'role':
          return this.compare(a.roleName, b.roleName, isAsc);
        default:
          return 0;
      }
    });
  }
  public compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  refresh(): void {
    window.location.reload();
  }
  public detail(username: string) {
    this.router.navigate(['detail', username]);
  }
  public checckAcc(username: string): boolean {
    if (username === sessionStorage.getItem('username')) {
      return true;
    } else {
      return false;
    }
  }
}

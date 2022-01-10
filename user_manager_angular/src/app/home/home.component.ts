import { Component, OnInit } from '@angular/core';

import { User } from '../model/user';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/service/http-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User[] = [];
  indexPagination: number = 1;
  public searchUser: FormGroup = new FormGroup({});
  listUserNotPagination: User[] = [];
  totalPagination: number = 0;
  min: number = 0;
  constructor(
    private httpServerService: HttpServiceService,
    private router: Router,

    private routerA: ActivatedRoute
  ) {}
  public ngOnInit() {
    if (this.routerA.snapshot.params['id']) {
      console.log('ID: ', this.routerA.snapshot.params['id']);
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
      console.log(
        'tong user ',
        (this.listUserNotPagination.length -
          (this.listUserNotPagination.length % 5)) /
          5 +
          1
      );
      if (this.totalPagination <= 0) {
        this.min = 0;
      } else {
        this.min = 1;
      }
      console.log('tong trang ', this.totalPagination);
      console.log('this.totalPagination', this.totalPagination);
      console.log('min: ', this.min);
    });
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.user = data.users;
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
      this.httpServerService.getAllUser(0).subscribe((data: any) => {
        this.user = data.users;
      });
    } else {
      this.httpServerService
        .search(
          this.searchUser.value.username,
          this.searchUser.value.firstname,
          this.searchUser.value.lastname,
          this.searchUser.value.email
        )
        .subscribe((data: any) => {
          console.log('User User', data);
          return (this.user = data);
        });
      console.log('username ', this.searchUser.value.username);
      console.log('firstname ', this.searchUser.value.firstname);
      console.log('lastname ', this.searchUser.value.lastname);
      console.log('email ', this.searchUser.value.email);
    }
  }

  public findPaginnation() {
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.user = data.users;
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
      });
    this.router.navigate(['home', this.indexPagination]);
  }

  public nextPage() {
    this.indexPagination = this.indexPagination + 1;
    console.log('indexPagination ', this.indexPagination);
    console.log('totalPagination ', this.totalPagination);
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.totalPagination;
    }
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        this.user = data.users;
      });
    this.router.navigate(['home', this.indexPagination]);
  }

  public prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    console.log('indexPagination ', this.indexPagination);
    console.log('totalPagination ', this.totalPagination);
    if (this.totalPagination <= 0 && this.indexPagination <= 0) {
      this.indexPagination = 0;
    } else if (this.indexPagination <= 0) {
      this.indexPagination = 1;
    }
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        console.log(this.indexPagination);
        this.user = data.users;
      });
    this.router.navigate(['home', this.indexPagination]);
  }

  public lastPage() {
    this.indexPagination = this.totalPagination;
    this.httpServerService
      .getAllUser(this.indexPagination - 1)
      .subscribe((data: any) => {
        console.log('trang ', this.indexPagination);
        console.log('tong trang ', this.totalPagination);
        this.user = data.users;
      });
    this.router.navigate(['home', this.indexPagination]);
  }
  public delete(userDelete: User) {
    var result = confirm('Are you sure to delete this user?');
    if (result) {
      console.log('USerDelete: ', userDelete);
      console.log('Trang dang xoa: ', this.indexPagination);
      if (this.user.length === 1) {
        console.log('So luong con lai: ', this.user.length);
        this.indexPagination = this.indexPagination - 1;
        this.totalPagination = this.totalPagination - 1;
        this.httpServerService.delete(userDelete).subscribe();
        this.httpServerService
          .getAllUser(this.indexPagination - 1)
          .subscribe((data: any) => {
            this.user = data.users;
            console.log('User sau xoa: ', this.user);
          });
        this.router.navigate(['home', this.indexPagination]);
      } else {
        this.httpServerService.delete(userDelete).subscribe();
        window.location.reload();
        this.router.navigate(['home', this.indexPagination]);
      }
    }
  }
  refresh(): void {
    window.location.reload();
  }
  public detail(username: string) {
    console.log('username: ', username);
    this.router.navigate(['detail', username]);
  }
}

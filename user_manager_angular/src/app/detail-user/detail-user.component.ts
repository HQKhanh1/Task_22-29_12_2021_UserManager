import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/service/http-service.service';
import { UtilsService } from 'src/service/utils.service';
import { User } from '../model/user';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  public username!: string;
  public user: User = new User('');
  public formEditUser = new FormGroup({
    username: new FormControl(''),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9](.?[a-z0-9]){0,}@g(oogle)?mail.com$'),
    ]),
    role: new FormControl(''),
  });
  public submitted: boolean = false;
  selectRole: string = '';
  public error: any = '';
  optionsRole = [
    { value: 'ROLE_ADMIN', nameValue: 'Admin' },
    { value: 'ROLE_USER', nameValue: 'User' },
  ];
  constructor(
    private router: ActivatedRoute,
    private httpService: HttpServiceService,
    private messageError: UtilsService
  ) {}

  ngOnInit(): void {
    this.username = this.router.snapshot.params['username'];
    this.httpService.getUserByUsername(this.username).subscribe((data) => {
      this.user.username = data.username;
      this.user.firstname = data.firstname;
      this.user.lastname = data.lastname;
      this.user.email = data.email.toLowerCase();
      this.user.password = data.password;
      this.user.roleName = data.roleName;
      this.selectRole = data.roleName;
      this.formEditUser = new FormGroup({
        username: new FormControl(this.user.username),
        firstname: new FormControl(this.user.firstname, [Validators.required]),
        lastname: new FormControl(this.user.lastname, [Validators.required]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email,
        ]),
        role: new FormControl(this.user.roleName),
      });
    });
  }

  public onChange() {}
  public update() {
    this.submitted = true;
    if (this.formEditUser.valid) {
      this.user.username = this.formEditUser.value.username;
      this.user.firstname = this.formEditUser.value.firstname;
      this.user.lastname = this.formEditUser.value.lastname;
      this.user.email = this.formEditUser.value.email.toLowerCase();
      this.user.roleName = this.selectRole;
      this.httpService.update(this.user).subscribe((data: any) => {
        this.error = this.messageError.messageError(data.statusCode);
      });

      if (this.error === '') {
        alert('Successful update!');
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
  public goBack() {
    history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/service/http-service.service';
import { UtilsService } from 'src/service/utils.service';
import { User } from '../model/user';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  submitted: boolean = false;
  checkSignUp: boolean = false;
  user: User = new User('');
  error: any = '';
  selectRole: string = '';
  optionsRole = [
    { value: 'ROLE_ADMIN', nameValue: 'Admin' },
    { value: 'ROLE_USER', nameValue: 'User' },
  ];
  public formCreate: FormGroup = new FormGroup({});
  constructor(
    private signUpService: HttpServiceService,
    private router: Router,
    private messageError: UtilsService
  ) {}

  ngOnInit(): void {
    this.formCreate = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9](.?[a-z0-9]){0,}@g(oogle)?mail.com$'),
      ])
    });
  }
  checkPasswords(): boolean {
    return this.formCreate.value.pass &&
      this.formCreate.value.confPass &&
      this.formCreate.value.pass === this.formCreate.value.confPass
      ? true
      : false;
  }
  public onChange() {}
  public addUser() {
    this.submitted = true;
      this.user.username = this.formCreate.value.username;
      this.user.firstname = this.formCreate.value.firstname;
      this.user.lastname = this.formCreate.value.lastname;
      this.user.email = this.formCreate.value.email.toLowerCase();
      this.user.password = 'none';
      this.user.roleName = this.selectRole;
      this.signUpService.createUser(this.user).subscribe((data: any) => {
        this.error = this.messageError.messageError(data.statusCode);
        if (!data.statusCode) {
          alert('Successfully create new user!')
        }
      });
  }
  public goBack() {
    history.back();
  }
}

import { Component, OnInit } from '@angular/core';

import { User } from './../model/user';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/service/utils.service';
import { HttpServiceService } from 'src/service/http-service.service';
// import { utils } from 'src/utils/util';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  submitted: boolean = false;
  user: User = new User('');
  error: any = '';
  public formSignUp: FormGroup = new FormGroup({});
  constructor(
    private signUpService: HttpServiceService,
    private router: Router,
    private messageError: UtilsService
  ) {}

  ngOnInit(): void {
    this.formSignUp = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required]),
      confPass: new FormControl('', [Validators.required]),
    });
  }
  public signUp() {
    this.submitted = true;
    if (this.formSignUp.valid && this.checkPasswords()) {
      console.log('bam do r ne');
      console.log('this.submitted:  ', this.submitted);
      console.log('this.formSignUp.valid:  ', this.formSignUp.valid);
      console.log('Checkpass: ', this.checkPasswords());
      this.user.username = this.formSignUp.value.username;
      this.user.firstname = this.formSignUp.value.firstname;
      this.user.lastname = this.formSignUp.value.lastname;
      this.user.email = this.formSignUp.value.email.toLowerCase();
      this.user.password = this.formSignUp.value.pass;
      this.user.roleName = 'ROLE_USER';
      console.log('User: ', this.user);
      this.signUpService.signUpUser(this.user).subscribe((data: any) => {
        console.log('null statuscoe');
        if (data.statusCode) {
          this.error = this.messageError.messageError(data.statusCode);
        } else {
          this.signUpService.sendMail(this.user).subscribe((data: any) => {
            console.log('data mail: ', data);
          });
          if (confirm('Successful registration, please login!')) {
            this.router.navigate(['login']);
          }
          console.log('null statuscoe');
        }
      });
    }
  }
  checkPasswords(): boolean {
    return this.formSignUp.value.pass &&
      this.formSignUp.value.confPass &&
      this.formSignUp.value.pass === this.formSignUp.value.confPass
      ? true
      : false;
  }
  public onReset(): void {
    this.submitted = false;
    console.log('this.submitted:  ', this.submitted);
    this.error = '';
    this.formSignUp.reset();
  }
}

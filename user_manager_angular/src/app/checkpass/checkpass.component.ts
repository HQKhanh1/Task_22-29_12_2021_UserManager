import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordService } from 'src/service/password.service';
import { HttpServiceService } from '../../service/http-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-checkpass',
  templateUrl: './checkpass.component.html',
  styleUrls: ['./checkpass.component.css'],
})
export class CheckpassComponent implements OnInit {
  public user: User = new User('');
  public formCurrentPass: FormGroup = new FormGroup({});
  public formChangePass: FormGroup = new FormGroup({});
  public username: string = '';
  public checkCurrent: any;
  public checkChangePass: any;
  public currentPass: string = '';
  public changePass: string = '';
  public submittedCurrentPass: boolean = false;
  public submittedChangePass: boolean = false;
  public error: any = '';
  constructor(
    private router: ActivatedRoute,
    private checkPassHttp: PasswordService,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.username = this.router.snapshot.params['username'];
    this.formCurrentPass = new FormGroup({
      currentPass: new FormControl('', [Validators.required]),
    });
    this.formChangePass = new FormGroup({
      changePass: new FormControl('', [Validators.required]),
      changePassConf: new FormControl('', [Validators.required]),
    });
  }
  public checkPass() {
    this.submittedCurrentPass = true;
    if (this.formCurrentPass.valid) {
      this.currentPass = this.formCurrentPass.value.currentPass;
      this.checkPassHttp
        .checkPass(this.username, this.currentPass)
        .subscribe((data: boolean) => {
          this.checkCurrent = data;
        });
      // this.check = true;
    }
  }
  public changePassword() {
    this.submittedChangePass = true;
    if (this.formCurrentPass.valid && this.checkMatchNewPass()) {
      this.user.password = this.formChangePass.value.changePass;
      this.httpService
        .updatePassword(this.username, this.user)
        .subscribe((data: boolean) => {
          if (data) {
            sessionStorage.removeItem('basicauth');
            sessionStorage.setItem(
              'basicauth',
              'Basic ' +
                btoa(this.username + ':' + this.formChangePass.value.changePass)
            );
            alert('Successfully change password');
            location.reload();
          }
        });
    }
  }
  public goBack() {
    history.back();
  }

  public goBackChange() {
    this.checkCurrent = '';
    this.submittedCurrentPass = false;
    this.submittedChangePass = false;
    this.ngOnInit();
  }
  checkMatchNewPass(): boolean {
    return this.formChangePass.value.changePass &&
      this.formChangePass.value.changePassConf &&
      this.formChangePass.value.changePass ===
        this.formChangePass.value.changePassConf
      ? true
      : false;
  }
}

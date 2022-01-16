import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/service/http-service.service';
import { User } from '../model/user';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
})
export class ForgotpassComponent implements OnInit {
  public user: User = new User('');
  public formCheckMail: FormGroup = new FormGroup({});
  public username: string = '';
  public submittedCheckPass: boolean = false;
  public checkSendMail: any = false;
  public error: any = '';
  constructor(
    private router: ActivatedRoute,
    private sendPassService: LoginService,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.username = this.router.snapshot.params['username'];
    this.formCheckMail = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  public checkPass() {
    this.submittedCheckPass = true;
    if (this.formCheckMail.valid) {
      console.log(
        'Bam do gui mail r ne roi ne',
        this.formCheckMail.value.email
      );
      this.sendPassService
        .findUsersByEmail(this.formCheckMail.value.email)
        .subscribe((data: User) => {
          console.log('Kiem tra mail thanh cong', data);
          if (data != null) {
            this.sendPassService
              .changePassUserThenForgotPass(data)
              .subscribe((dataMail) => {
                this.checkSendMail = dataMail;
                console.log('da gui mail roi', dataMail);
                this.checkSendMail = true;
              });
          } else {
            this.checkSendMail = null;
          }
        });
    }
  }
  public goBack() {
    history.back();
  }

  public goBackChange() {
    this.ngOnInit();
  }
}

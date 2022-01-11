import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/service/http-service.service';
import { UtilsService } from 'src/service/utils.service';
import { User } from '../model/user';

@Component({
  selector: 'app-changpass',
  templateUrl: './changpass.component.html',
  styleUrls: ['./changpass.component.css']
})
export class ChangpassComponent implements OnInit {
  public formCurrentPass: FormGroup = new FormGroup({});
  public formChangePass: FormGroup = new FormGroup({});
  public username: string = '';
  public check: boolean = false;
  public currentPass: string = '';
  public changePass: string = '';
  public submittedCurrentPass: boolean = false;
  public submittedChangePass: boolean = false;
  public error: any = '';
  constructor(
    private router: ActivatedRoute,
    private httpService: HttpServiceService,
    private messageError: UtilsService
  ) {}

  ngOnInit(): void {
    this.username = this.router.snapshot.params['username'];
    this.formCurrentPass = new FormGroup({
      currentPass: new FormControl('', [Validators.required]),
    });

  }
  public checkPass(){
    this.submittedCurrentPass = true;
    console.log("Bam do roi ne");
    if(this.formCurrentPass.valid){
      console.log("Bam do roi ne");
    }

  }
  public changePassword(){

  }
  public goBack() {
    history.back();
  }

}

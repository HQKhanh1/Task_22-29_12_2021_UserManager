import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/service/http-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  public username!: string;
  public user: User = new User();
  constructor(
    private router: ActivatedRoute,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.username = this.router.snapshot.params['username'];
    this.httpService.getUserByUsername(this.username).subscribe((data) => {
      this.user = data;
    });
    console.log("DData: ", this.user);
  }

  public goBack() {
    history.back();
  }
}

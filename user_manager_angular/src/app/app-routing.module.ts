import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdServiceService } from '../service/auth-gaurd-service.service';
import { InfoComponent } from './info/info.component';
import { ChangpassComponent } from './changpass/changpass.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGaurdServiceService],
  },
  {
    path: 'home/:id',
    component: HomeComponent,
    canActivate: [AuthGaurdServiceService],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: 'edit', component: EditComponent },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AuthGaurdServiceService],
  },
  {
    path: 'detail/:username',
    component: DetailUserComponent,
    canActivate: [AuthGaurdServiceService],
  },
  {
    path: 'info/:username',
    component: InfoComponent,
    canActivate: [AuthGaurdServiceService],
  },
  {
    path: 'changepass/:username',
    component: ChangpassComponent,
    canActivate: [AuthGaurdServiceService],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGaurdServiceService],
  },
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

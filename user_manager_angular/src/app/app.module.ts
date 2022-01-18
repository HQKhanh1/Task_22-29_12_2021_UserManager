import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './add/add.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { InfoComponent } from './info/info.component';
import { CheckpassComponent } from './checkpass/checkpass.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import { MDBBootstrapModule } from 'angularbootstrap-md';
@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    DetailUserComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    PageNotFoundComponent,
    SignupComponent,
    LogoutComponent,
    InfoComponent,
    CheckpassComponent,
    ForgotpassComponent,
    ViewUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

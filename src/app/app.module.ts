import { ProfileComponent } from './profile/profile.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {HttpUserService} from './services/http.user.service';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpUserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

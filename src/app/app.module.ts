<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
=======
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {HttpService} from './services/http.service';
import {FormsModule} from '@angular/forms';
>>>>>>> e310df80f2bd7970506961070cadbfc58bf64c91

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    ProfileComponent
=======
    RegistrationComponent,
    LoginComponent
>>>>>>> e310df80f2bd7970506961070cadbfc58bf64c91
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
=======
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
>>>>>>> e310df80f2bd7970506961070cadbfc58bf64c91
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

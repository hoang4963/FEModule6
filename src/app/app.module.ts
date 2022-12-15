import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../enviroments/environment";
import {ShareModule} from "./share/share.module";
import { LoginComponent } from './jwt/login/login.component';
import {HouseModule} from "./house/house.module";
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from "./register/register.component";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';

 import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {MatNativeDateModule} from "@angular/material/core";
import {UserUpdteComponent} from "./user/user-updte/user-updte.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordComponent } from "../app/change-password/change-password.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SwiperModule} from "swiper/angular";
import {HouseDeleteComponent} from "./house/house-delete/house-delete.component";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserProfileComponent,
    UserUpdteComponent,
    ChangePasswordComponent,
    HouseDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    HouseModule,
    HttpClientModule,
    ReactiveFormsModule,
    ShareModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    SwiperModule,
    NgbCarousel,
    NgbSlide,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

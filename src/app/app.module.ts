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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    ShareModule,
    HouseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

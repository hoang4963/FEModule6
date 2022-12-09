import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./jwt/login/login.component";
import {HomeComponent} from "./home/home.component";
import {UserProfileComponent} from "./user/user-profile/user-profile.component";
import {UserService} from "./service/user.service";

const routes: Routes = [
  {
    path: 'house',
    loadChildren: () => import('./house/house.module').then(module => module.HouseModule)
  },{
    path: 'register',
    component: RegisterComponent

  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: "user",
    component: UserProfileComponent

  }, {
    path: 'home',
    component: HomeComponent
  },{
    path : 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path : ""
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

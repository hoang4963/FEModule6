import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./jwt/login/login.component";
import {HomeComponent} from "./home/home.component";
import {UserProfileComponent} from "./user/user-profile/user-profile.component";
import {UserService} from "./service/user.service";
import {UserUpdteComponent} from "./user/user-updte/user-updte.component";

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
  }, {
    path: 'home',
    component: HomeComponent
  },{
    path : 'update/:id',
    component: UserUpdteComponent
  },
  {
    path : 'user/:id',
    component : UserProfileComponent
  }
  // ,
  // {
  //   path : ""
  // }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

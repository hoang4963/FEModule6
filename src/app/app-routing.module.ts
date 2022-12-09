import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./jwt/login/login.component";
import {UserProfileComponent} from "./user/user-profile/user-profile.component";
import {UserService} from "./service/user.service";

const routes: Routes = [
  {
    path: 'house',
    loadChildren: () => import('./house/house.module').then(module => module.HouseModule)
  },
  {
    path: '',
    component: LoginComponent
  },
  {
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

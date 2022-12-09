import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./jwt/login/login.component";
// import {ResetPasswordComponent} from "./house/reset-password/reset-password.component";

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

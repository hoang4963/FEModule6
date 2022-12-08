import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import {RegisterComponent} from "./register/register.component";
=======
import {LoginComponent} from "./jwt/login/login.component";
>>>>>>> 84bb63555e734128748f29f4e8da0c048845644b

const routes: Routes = [
  {
    path: 'house',
    loadChildren: () => import('./house/house.module').then(module => module.HouseModule)
<<<<<<< HEAD
  },{
    path: 'register',
    component: RegisterComponent
=======
  },
  {
    path: '',
    component: LoginComponent
>>>>>>> 84bb63555e734128748f29f4e8da0c048845644b
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

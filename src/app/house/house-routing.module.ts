import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HouseListComponent} from "./house-list/house-list.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
// import {ResetPasswordComponent} from "./reset-password/reset-password.component";


const routes: Routes = [{
  path: 'list',
  component: HouseListComponent
},
  {
  path: 'detail/:id',
  component: HouseDetailComponent
},
  // {
  //   path: 'house/resetpassword',
  //   component: ResetPasswordComponent
  // }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }

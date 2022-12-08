import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HouseListComponent} from "./house-list/house-list.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";


const routes: Routes = [{
  path: 'list',
  component: HouseListComponent
},
  {
  path: 'detail/:id',
  component: HouseDetailComponent
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HouseListComponent} from "./house-list/house-list.component";

<<<<<<< HEAD
import {HouseDetailComponent} from "./house-detail/house-detail.component";
=======
>>>>>>> 069071bee071085006ba4cd28d72a5afacbcfb37


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

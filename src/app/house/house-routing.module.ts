import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HouseListComponent} from "./house-list/house-list.component";

import {HouseCreateComponent} from "./house-create/house-create.component";


const routes: Routes = [{
  path: 'list',
  component: HouseListComponent

}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }

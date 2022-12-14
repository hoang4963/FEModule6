import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HouseListComponent} from "./house-list/house-list.component";
// import {OrderCreateComponent} from "./order-create1/order-create.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";

import {HouseCreateComponent} from "./house-create/house-create.component";
import {OderCreateComponent} from "./oder-create/oder-create.component";
import {HouseUpdateStatusComponent} from "./house-update-status/house-update-status.component";
import {List5houseComponent} from "./list5house/list5house.component";

const routes: Routes = [{
  path: 'list',
  component: HouseListComponent
},
  {
    path: 'detail/:id',
    component: HouseDetailComponent
  },
  {
    path: 'orders/:id',
    component: OderCreateComponent
  }, {
    path: 'create',
    component: HouseCreateComponent
  }, {
    path: 'updatestatus/:id',
    component: HouseUpdateStatusComponent
  }, {
    path: 'list5house',
    component: List5houseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}

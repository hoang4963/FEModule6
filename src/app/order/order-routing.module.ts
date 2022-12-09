import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderCreateComponent} from "../house/order-create/order-create.component";

const routes: Routes = [{
  path: "create",
  component: OrderCreateComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

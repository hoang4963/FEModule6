import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./jwt/login/login.component";
import {OrderCreateComponent} from "./house/order-create/order-create.component";

const routes: Routes = [
  {
    path: 'house',
    loadChildren: () => import('./house/house.module').then(module => module.HouseModule)
  }, {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'orders',
    loadChildren: () => import('./order/order.module').then(module => module.OrderModule)

}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

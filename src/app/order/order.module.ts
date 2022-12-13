import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { BookingComponent } from './booking/booking.component';
import {ShareModule} from "../share/share.module";


@NgModule({
  declarations: [
    BookingComponent
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        ShareModule
    ]
})
export class OrderModule { }

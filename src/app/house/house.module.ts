import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { HouseListComponent } from './house-list/house-list.component';
import { HouseCreateComponent } from './house-create/house-create.component';
import { HouseEditComponent } from './house-edit/house-edit.component';
import { HouseDeleteComponent } from './house-delete/house-delete.component';


@NgModule({
  declarations: [
    HouseListComponent,
    HouseCreateComponent,
    HouseEditComponent,
    HouseDeleteComponent
  ],
  exports: [
    HouseListComponent,
    HouseEditComponent
  ],
  imports: [
    CommonModule,
    HouseRoutingModule
  ]
})
export class HouseModule { }

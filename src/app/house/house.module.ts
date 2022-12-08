import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { HouseListComponent } from './house-list/house-list.component';
import { HouseCreateComponent } from './house-create/house-create.component';
import { HouseEditComponent } from './house-edit/house-edit.component';
import { HouseDeleteComponent } from './house-delete/house-delete.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "../share/share.module";


@NgModule({
  declarations: [
    HouseListComponent,
    HouseCreateComponent,
    HouseEditComponent,
    HouseDeleteComponent,
    HouseDetailComponent
  ],
  exports: [
    HouseListComponent,
    HouseEditComponent
  ],
    imports: [
        CommonModule,
        HouseRoutingModule,
        ReactiveFormsModule,
        ShareModule
    ]
})
export class HouseModule { }

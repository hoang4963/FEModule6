import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { HouseListComponent } from './house-list/house-list.component';
import { HouseCreateComponent } from './house-create/house-create.component';
import { HouseEditComponent } from './house-edit/house-edit.component';
import { HouseDeleteComponent } from './house-delete/house-delete.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "../share/share.module";
import { OderCreateComponent } from './oder-create/oder-create.component';
import { HouseStatusEditComponent } from './house-status-edit/house-status-edit.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import { HouseUpdateStatusComponent } from './house-update-status/house-update-status.component';



@NgModule({
  declarations: [
    HouseListComponent,
    HouseCreateComponent,
    HouseEditComponent,
    HouseDeleteComponent,
    HouseDetailComponent,
    OderCreateComponent,

    HouseStatusEditComponent,
    HouseUpdateStatusComponent,
  ],
  exports: [
    HouseListComponent,
    HouseEditComponent
  ],
  imports: [
    CommonModule,
    HouseRoutingModule,
    ReactiveFormsModule,
    ShareModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule
  ]
})

export class HouseModule { }

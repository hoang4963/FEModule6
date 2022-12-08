import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtRoutingModule } from './jwt-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class JwtModule { }

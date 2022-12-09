import {Component, OnInit} from '@angular/core';
import {OrderDTO} from "../../model/order-dto";
import {UserService} from "../../service/user.service";
import {HouseService} from "../../service/house.service";
import {OrderStatus} from "../../model/order-status";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-oder-create',
  templateUrl: './oder-create.component.html',
  styleUrls: ['./oder-create.component.css']
})
export class OderCreateComponent implements OnInit {
  order: OrderDTO = {
    userId: 0,
    houseId: 0,
    orderStatusID: 0,
    startTime: "",
    endTime: "",
    createTime: ""

  }
  orderForm: FormGroup | undefined | any;

  constructor(
    // private houseService: HouseService,
    // private orderStatus: OrderStatus,
    // private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.createOrder()
  }

  createOrder() {
    this.orderForm = new FormGroup({
      userId: new FormControl(),
      houseId: new FormControl(),
      orderStatusID: new FormControl(),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('',[Validators.required]),
      createTime: new FormControl('',[Validators.required])
    })
  }
  submit() {

  }
}

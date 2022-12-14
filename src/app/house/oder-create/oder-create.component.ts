import {Component, OnInit} from '@angular/core';
import {OrderDTO} from "../../model/order-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";
import {House} from "../../model/house";
import {HouseService} from "../../service/house.service";
import * as moment from "moment";

@Component({
  selector: 'app-oder-create',
  templateUrl: './oder-create.component.html',
  styleUrls: ['./oder-create.component.css']
})
export class OderCreateComponent implements OnInit {
  object: any;

  id: number = 0;
  totalPrice: number = 0;
  rent!: any;
  house!: House;
  listOrders: Order[] = [];
  order: OrderDTO = {
    usersId: Number(localStorage.getItem('ID')),
    houseId: 0,
    orderStatusID: 1,
    startTime: null,
    endTime: null,
    createTime: new Date()

  }
  orderForm: FormGroup | undefined | any;


  constructor(
    private activateRoute: ActivatedRoute,
    private houseService: HouseService,
    private orderService: OrderService,
  ) {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
        // @ts-ignore
        this.id = +paraMap.get('id');
      }
    )
    this.houseService.findById(this.id).subscribe(res => {
      this.house = res
    });
    this.getAllOrderByHouseId(this.id);

  }


  ngOnInit(): void {
    this.createOrder();
    // this.getAllOrder();
  }

  getAllOrderByHouseId(id: number) {

    this.orderService.showOrderByHouseId(id).subscribe(result => {
        this.listOrders = result;

        console.log(result)
      }, error => {
        console.log(error);
      }
    )
  }


  getRentHouse(id: number) {
    return this.houseService.findById(id).subscribe(house => {
      this.rent = house.rent
    })
  }

  getTotalRent() {
    this.totalPrice = (this.order.endTime - this.order.startTime) * this.rent;
    // console.log(this.totalPrice)
  }

  createOrder() {
    this.orderForm = new FormGroup({
      userId: new FormControl(),
      houseId: new FormControl(),
      orderStatusID: new FormControl(),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      createTime: new FormControl('', [Validators.required])
    })
  }


  myFilter = (d: Date | null): boolean => {
    let a = moment(d).isAfter(Date.now(), "day")
    // !a ||
    if (!a) {
      return false
    } else {
      for (let i = 0; i < this.listOrders.length; i++) {
        this.object = this.listOrders[i];

        let isNotCollapseTime = moment(d).isBefore(this.object.startTime, 'day') || moment(d).isAfter(this.object.endTime, 'day');
        if (!isNotCollapseTime) {
          return false
        }

        console.log(this.object)

      }
      return true;
    }
  };

  submit() {
    this.order.houseId = this.id;
    // console.log(this.house)
    this.orderService.createOrder(this.order, this.id).subscribe(() => {
        alert("Tạo order thành công")

      }, error => {
        alert("Đã trùng ngày ")
      }
    );

    this.orderForm.reset();

  }

}

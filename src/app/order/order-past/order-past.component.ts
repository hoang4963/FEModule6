import {Component, OnInit} from '@angular/core';
import {Order} from "../../model/order";
import {OrderService} from "../../service/order.service";
import {HouseService} from "../../service/house.service";
import {House} from "../../model/house";
import {User} from "../../model/user";
import {Status} from "../../model/status";
import {Image} from "../../model/Image";

@Component({
  selector: 'app-order-past',
  templateUrl: './order-past.component.html',
  styleUrls: ['./order-past.component.css']
})
export class OrderPastComponent implements OnInit{
  id: number = 0;
  orderList: Order[] = [];
  houseList: House[] = [];
  ngOnInit(): void {
    this.id = Number(localStorage.getItem("ID"));
    this.getOrderPast(this.id);
  }
  constructor(private orderService: OrderService,
              private houseService: HouseService) {
  }

  getOrderPast(id: number){
    this.orderService.getOrderPast(id).subscribe(result => {
      this.orderList = result;
      console.log(this.orderList)
    })
  }
  getListHouse(){
  }
}

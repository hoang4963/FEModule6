import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {OrderService} from "../../service/order.service";
import {House} from "../../model/house";
import {FormControl, FormGroup} from "@angular/forms";
import {Income} from "../../model/income";
import {Order} from "../../model/order";

@Component({
  selector: 'app-house-income',
  templateUrl: './house-income.component.html',
  styleUrls: ['./house-income.component.css']
})
export class HouseIncomeComponent implements OnInit{
  id: number = 0;
  listHouse: House[] = [];
  listId: number[] = [];
  result: string = "";
  income: Income ={
    houseId: "",
    month: "",
  }
  orders: Order[] = [];
  form = new FormGroup( {
    houseId: new FormControl(),
    month: new FormControl()
  });
  check: boolean = false;
  image: string = "";
    constructor(private houseService: HouseService,
                private orderService: OrderService) {
      this.id = Number(localStorage.getItem('ID'));
      this.houseService.findByUserId(this.id).subscribe( res => {
        this.listHouse = res;
      })
    }
  ngOnInit(): void {
  }
  submit(){
    let sum: number = 0;
    let houseName: string ="";
    this.income = this.form.value;
    console.log(this.income)
    this.orderService.getIncome(this.income).subscribe( res => {
      this.orders = res;
      houseName = String(this.orders[0].house?.houseName);
      if (this.orders.length > 0) {
        this.check = true;
        houseName = String(this.orders[0].house?.houseName);
        // @ts-ignore
        this.image = String(this.orders[0].house?.image[0].imageName)
        for (let i = 0; i < this.orders.length; i++) {
          sum += Number(this.orders[i].income);

        }
        this.result = "Thu nhập của nhà " + houseName + " là: " + sum + "VNĐ";
      }
      else this.result = "không có thu nhập nào trong tháng này";

    })
  }
}

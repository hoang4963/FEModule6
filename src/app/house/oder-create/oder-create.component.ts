import {Component, OnInit} from '@angular/core';
import {OrderDTO} from "../../model/order-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";
import {HttpClient} from "@angular/common/http";
import {House} from "../../model/house";
import {HouseService} from "../../service/house.service";
import * as moment from "moment";

@Component({
  selector: 'app-oder-create',
  templateUrl: './oder-create.component.html',
  styleUrls: ['./oder-create.component.css']
})
export class OderCreateComponent implements OnInit {

  id: number = 0;
  totalPrice: number = 0;
  rent!: any;
  house!: House;


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
    // private http : HttpClient,
    // private router : Router,
    private houseService: HouseService,
    private orderService: OrderService,
    // private userService: UserService,
  ) {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
        // @ts-ignore
        this.id = +paraMap.get('id');
        // this.getRentHouse(this.id);
        // this.getTotalRent();
      }
    )
    this.houseService.findById(this.id).subscribe(res => {
      this.house = res
    });
  }

  ngOnInit(): void {
    this.createOrder();
    // this.getAllOrder();
  }
  getAllOrder() {
    this.orderService.getAll().subscribe(result => {
        // this.order = result;
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
    console.log(this.totalPrice)
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

  //cái này dùng để check điều kiện của order
  myFilter = (d: Date | null): boolean => {
    //chưa lấy được dữ liệu từ database
    console.log(this.order)
    console.log(this.order.startTime);
    console.log(moment(d).isBefore(this.order.startTime, 'day'));
    console.log(moment(d).isAfter(this.order.endTime, 'day'));
    // lich
    const b = moment(d).isBefore(this.order.startTime, 'day') && moment(d).isAfter(this.order.endTime, 'day')
    // const date = (d || new Date()).getDate() + '-' + (d || new Date()).getMonth() + '-' + (d || new Date()).getFullYear();
    // const datecheck : Date
    console.log(d)
    // if (moment(d).i)

    // Prevent Saturday and Sunday from being selected.
    return !b;
  };

  submit() {
    console.log(this.order);
    // this.order.usersId =
    this.order.houseId = this.id;

    // this.order.orderStatusID = 1;
    // this.order.startTime = this.orderForm.value.startTime
    // this.order.endTime = this.orderForm.value.endTime
    // this.order.createTime = Date.now()
    // this.orderService.createOrder(this.order, this.id).subscribe(() => {
    //     this.orderForm.reset();
    //     alert("Tạo order thành công")
    //   }, error => {
    //     console.log(error);
    //   }
    // )
    this.orderService.createOrder(this.order, this.id).subscribe(() => {
        alert("Tạo order thành công")

      }, error => {
        alert("Đã trùng ngày ")
      }
    );

    this.orderForm.reset();

  }

}

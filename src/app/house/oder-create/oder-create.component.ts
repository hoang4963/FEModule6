import {Component, OnInit} from '@angular/core';
import {OrderDTO} from "../../model/order-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-oder-create',
  templateUrl: './oder-create.component.html',
  styleUrls: ['./oder-create.component.css']
})
export class OderCreateComponent implements OnInit {

  id: number = 0;

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
    // private houseService: HouseService,
    private orderService: OrderService,
    // private userService: UserService,
  ) {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      // @ts-ignore
      this.id = +paraMap.get('id');
    })
  }

  ngOnInit(): void {
    this.createOrder();

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
    const date = (d || new Date()).getDate();
    // const datecheck : Date
    console.log(date)

      // Prevent Saturday and Sunday from being selected.
      return date !== 0 && date !== 6;
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

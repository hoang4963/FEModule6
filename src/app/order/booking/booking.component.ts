import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";
import {Image} from "../../model/Image";
import {House} from "../../model/house";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  house!: House;
  bookings: Order[] = [];
  listOrderByUserId: Order[] = [];
  listFirstImage: string[] = [];
  listImage: Image[] = [];
  orderStatus!: number;

  userId:number = 0;
  page: number = 0;
  lastpage! : number;
  listPageNumber: number[] = [];
  constructor(private orderService : OrderService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.page = +paramMap.get('start');

      this.userId = Number(localStorage.getItem('ID'));
      this.getBooking(this.userId,this.page)
    });
  }
  ngOnInit(): void {


  }

  getBooking(userId: number,start: number) {
    this.orderService.getBookingByHouseOfUserID(userId,start).subscribe(res => {
      // @ts-ignore
      this.bookings = res;
      console.log(this.bookings)
      // @ts-ignore
      for (let i = 0; i < this.bookings.length; i++) {
        // @ts-ignore
        this.listFirstImage.push(this.bookings[i].house?.image[0].imageName);
      }
    }, error => {
      console.log(error);
    })
  }
  getPageNumberMax(id : number) {
    this.orderService.getBookingByUserId(id).subscribe(res => {
      this.listOrderByUserId = res;
      this.lastpage = Math.floor(((this.listOrderByUserId.length)/5));
      console.log(this.lastpage)
      for (let i = 0; i <= Math.floor(this.listOrderByUserId.length/5); i++) {
        this.listPageNumber.push((i+1));
      }
    })
  }
  submit(id: any) {
    this.orderStatus = 2;
    this.orderService.changeOderStatus(id, this.orderStatus).subscribe(() => {
      alert("Đã xác nhận!!!");
      location.reload();
    }, error => {
      alert("Có lỗi xảy ra!")
      location.reload();
    })

  }

  cancel(id: any) {
    this.orderStatus = 4;
    this.orderService.changeOderStatus(id, this.orderStatus).subscribe(() => {
      console.log(id)
      alert("Đã hủy thành công!!!");
      location.reload();
    }, eror => {
      alert("Có lỗi xảy ra!");
      location.reload();
    })
  }


  log(data: any) {
    new Date(data).toUTCString()
    console.log(data, typeof data)
    console.log("new Date", new Date(data), "kiểu dữ liệu", typeof new Date(data))
    console.log("new Date UTC", new Date(data).toUTCString(), "kiểu dữ liệu UTC", typeof new Date(data).toUTCString())
    console.log("new Date toISOString", new Date(data).toISOString(), "kiểu dữ liệu UTC", typeof new Date(data).toISOString())

  }
  covert(data: any) {
    return (new Date(Date.parse(data)).toString().slice(0, 15))

  }
}


import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";
import {Image} from "../../model/Image";
import {House} from "../../model/house";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  house!: House;
  bookings: Order[] = [];
  listFirstImage: string[] = [];
  listImage: Image[] = [];
  orderStatus!: number;

  constructor(private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.getBooking()
  }

  getBooking() {
    let userid = Number(localStorage.getItem('ID'))
    this.orderService.getBookingByUserID(userid).subscribe(res => {
      // @ts-ignore
      this.bookings = res;
      console.log(res)
      // @ts-ignore
      for (let i = 0; i < this.bookings.length; i++) {
        // @ts-ignore
        this.listFirstImage.push(this.bookings[i].house?.image[0].imageName);
      }
    }, error => {
      console.log(error);
    })
  }

  submit(id: any) {
    this.orderStatus = 2;
    console.log(id, this.orderStatus)
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
}

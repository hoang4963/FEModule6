import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";
import {Image} from "../../model/Image";
import {House} from "../../model/house";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmailService} from "../../service/email.service";
import {EmailDetails} from "../../model/emailDetails";

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
  emailDetails: EmailDetails = {
    recipient: "",
    msgBody: "",
    subject: "",
    attachment: "",
  }
  userId:number = 0;
  page: number = 0;
  lastpage! : number;
  listPageNumber: number[] = [];
  listOrderByHouseId: Order[] = [];
  constructor(private orderService : OrderService,
              private activatedRoute: ActivatedRoute,
              private emailService: EmailService ) {
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
  sendMail(subject: string, msgBody: string)
  {
    this.emailDetails.subject = subject;
    this.emailDetails.msgBody = msgBody;
    this.emailService.sendMail(this.emailDetails).subscribe(res => {
      console.log(res);
    })
  }
  submit(id: any) {
    this.orderStatus = 2;
    this.orderService.changeOderStatus(id, this.orderStatus).subscribe(() => {
      let startDate: Date;
      let endDate: Date;
      let subject = "Bạn đã đặt thành công một căn nhà trên AirBlade";
      let msgBody = "";
      let houseId = 0;
      this.orderService.showOrderById(id).subscribe( res => {
        msgBody = "Đơn hàng của bạn đã được xác nhận! /n Đơn hàng bắt đầu từ ngày: " + res.startTime + " tới ngày "+  res.endTime + " /n tên căn nhà bạn thuê là: " + res.house?.houseName;
        houseId = Number(res.house?.id);
        startDate = res.startTime;
        endDate = res.endTime;
      })
      this.orderService.showOrderByHouseId(houseId).subscribe(res => {
        this.listOrderByHouseId = res;
        for (let i = 0; i < this.listOrderByHouseId.length; i++) {
          if (endDate >= this.listOrderByHouseId[i].endTime && this.listOrderByHouseId[i].endTime >= startDate && startDate > this.listOrderByHouseId[i].startTime){
              this.cancel(this.listOrderByHouseId[i].id);
          }
          if (this.listOrderByHouseId[i].endTime >= endDate && endDate >= this.listOrderByHouseId[0].startTime && this.listOrderByHouseId[0].startTime > startDate ){
              this.cancel(this.listOrderByHouseId[i].id);
          }
          if (endDate >= this.listOrderByHouseId[i].endTime && startDate <= this.listOrderByHouseId[0].startTime){
            this.cancel(this.listOrderByHouseId[i].id);
          }
          if (endDate <= this.listOrderByHouseId[i].endTime && startDate >= this.listOrderByHouseId[0].startTime){
            this.cancel(this.listOrderByHouseId[i].id);
          }
        }
      })
      this.sendMail(subject, msgBody);
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
      let subject = "Rất tiếc phải hủy một đơn hàng của bạn trên AirBlade";
      let msgBody = "";
      this.orderService.showOrderById(id).subscribe( res => {
        msgBody = "Chúng tôi rất tiếc khi phải hủy đợn hàng tạo ngày: "  + res.createTime + " tên căn hộ: " + res.house?.houseName;
      })
      this.sendMail(subject,msgBody);
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


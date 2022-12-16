import { Component } from '@angular/core';
import {Order} from "../../model/order";
import {House} from "../../model/house";
import {Image} from "../../model/Image";
import {OrderService} from "../../service/order.service";
import {HouseService} from "../../service/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmailService} from "../../service/email.service";
import {EmailDetails} from "../../model/emailDetails";
import {User} from "../../model/user";

@Component({
  selector: 'app-order-wait',
  templateUrl: './order-wait.component.html',
  styleUrls: ['./order-wait.component.css']
})
export class OrderWaitComponent {
  page: number = 0;
  listOrderByUserId: Order[] = [];
  id: number = 0;
  listPageNumber: number[] = [];
  orderList: Order[] = [];
  house!: House;
  listFirstImage: string[] = [];
  listImage: Image[] = [];
  lastpage! : number
  check!:boolean
  emailDetails: EmailDetails = {
    recipient: "",
    msgBody: "",
    subject: "",
    attachment: "",
  }
  ngOnInit(): void {
    this.getPageNumberWaitMax(this.id);
  }

  constructor(private orderService: OrderService,
              private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private emailService: EmailService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.page = +paramMap.get('start');
      this.id = Number(localStorage.getItem("ID"));
      this.getOrderWait(this.id, this.page);
    });
  }

  getOrderWait(id: number, start: number) {
    this.orderService.getOrderWaitConfirm(id, start).subscribe(result => {
      this.orderList = result;
      console.log(Date.parse(this.orderList[0].startTime) - Date.now());
      for (let i = 0; i < this.orderList.length; i++) {
        // @ts-ignore
        this.listFirstImage.push(this.orderList[i].house?.image[0].imageName);
      }
    }, error => {
      console.log(error);
    })
  }
  getPageNumberWaitMax(id : number) {
    this.orderService.getOrderWaitByUserId(id).subscribe(res => {
      this.listOrderByUserId = res;
      this.lastpage = Math.floor(((this.listOrderByUserId.length)/5));
      console.log(this.lastpage)
      for (let i = 0; i <= Math.floor(this.listOrderByUserId.length/5); i++) {
        this.listPageNumber.push((i+1));
      }
    })
  }

  sendMail(subject: string, msgBody: string, recipient: string) {
    this.emailDetails.subject = subject;
    this.emailDetails.msgBody = msgBody;
    this.emailDetails.recipient = recipient;
    this.emailService.sendMail(this.emailDetails).subscribe(res => {
      console.log(res);
    })
  }
  cancelOrder(id: any, date: string){
    let idNumber = Number(id);
    const oneDayToMiliS= 86400000;
    let now = Date.now();
    let dateOfOrder  = Date.parse(date);
    let msgBody = "";
    let  recipient = "";
    if ((dateOfOrder - now) > oneDayToMiliS){
      this.check =true;
        this.orderService.cancelOrderByUser(idNumber).subscribe( () =>{
          this.orderService.showOrderById(idNumber).subscribe( res => {
            msgBody = "khách hàng " + res.user?.fullName + " đã hủy đơn thuê nhà: " + res.house?.houseName + " lúc " + Date.now();
            recipient = String(res.user?.email);
            this.sendMail("Khách hàng đã hủy đơn", msgBody,recipient);
          })
          alert("Thành công");
          location.reload();
        }, error => {
          console.log(error);
          alert("Đơn hàng không tồn tại");
        });
    }
    else {
      this.check = false;
      alert("không thể huỷ thuê nhà trong vòng 1 ngày trước thời gian thuê ")
    }
  }
  covert(data: any) {
    return (new Date(Date.parse(data)).toString().slice(0, 15))
  }
}

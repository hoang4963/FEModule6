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
export class BookingComponent implements OnInit{
  house!: House;
  bookings: Order[]=[];
  listFirstImage: string[] = [];
  listImage: Image[]=[];
  constructor(private orderService : OrderService) {

  }

  ngOnInit(): void {
    this.getBooking()
  }
  getBooking(){
    let userid = Number(localStorage.getItem('ID'))
    this.orderService.getBookingByUserID(userid).subscribe(res => {
      // @ts-ignore
      this.bookings = res;
      // @ts-ignore
      for (let i = 0; i < this.bookings.length; i++) {
        // @ts-ignore
        this.listFirstImage.push(this.bookings[i].house?.image[0].imageName);
      }
    },error => {
      console.log(error);
    })
  }
}

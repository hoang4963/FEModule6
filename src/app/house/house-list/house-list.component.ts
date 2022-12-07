import {Component, OnInit} from '@angular/core';
import {House} from "../../model/house";
import {HouseService} from "../../service/house.service";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit{
    houses: House[] = [];
  constructor(private houseService: HouseService) {
  }
  ngOnInit() {
    this.houseService.getAll().subscribe(result => {
        this.houses = result;
        console.log(this.houses)
      }, error => {
        console.log(error);
      }
    )
  }
}

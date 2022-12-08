import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit{

  constructor(private houseService: HouseService) {
  }
  ngOnInit(): void {
  }
  houseForm: FormGroup = new FormGroup({
      houseName: new FormControl(),
      houseAddress: new FormControl(),
      bedrooms: new FormControl(),
      bathrooms: new FormControl(),
      rent: new FormControl(),
      description: new FormControl(),
      status: new FormControl(),
      image1: new FormControl(),
      image2: new FormControl(),
      image3: new FormControl(),
  })
}

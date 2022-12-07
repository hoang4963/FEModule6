import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HouseService} from "../../service/house.service";
import {Image} from "../../model/Image";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent {
  houseForm: FormGroup | any;
  id: number | any;
  // @ts-ignore
  listImage: Image[];
  image1: any;
  image2: any;
  image3: any;
  constructor(private houseService: HouseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getHouse(this.id);
      this.initializeForm();
      this.getImage(this.id);
    });
  }

  ngOnInit() {
  }
  initializeForm(){
    this.houseForm = new FormGroup({
      Name: new FormControl(),
      Address: new FormControl(),
      Rent: new FormControl(),
      description: new FormControl(),
      bedrooms: new FormControl(),
      bathrooms: new FormControl(),
      HouseStatus: new FormControl()
    });
  }

  getHouse(id: number) {
    return this.houseService.findById(id).subscribe(house => {
      this.houseForm = new FormGroup({
        Name: new FormControl(house.houseName),
        Address: new FormControl(house.houseAddress),
        Rent: new FormControl(house.rent),
        description: new FormControl(house.description),
        bedrooms: new FormControl(house.bedrooms),
        bathrooms: new FormControl(house.bathrooms),
        HouseStatus: new FormControl(house.status?.statusName)
      });
    });
  }
  getImage(id: number){
    return this.houseService.findImageByHouseId(id).subscribe( listImage => {
        // @ts-ignore
      this.listImage = listImage;
      this.image1 = this.listImage[0];
      this.image2 = this.listImage[1];
      this.image3 = this.listImage[2];


    })
  }
}

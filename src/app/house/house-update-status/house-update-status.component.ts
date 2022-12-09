import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Image} from "../../model/Image";
import {HouseService} from "../../service/house.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Status} from "../../model/status";
import {HouseStatusService} from "../../service/house-status.service";

@Component({
  selector: 'app-house-update-status',
  templateUrl: './house-update-status.component.html',
  styleUrls: ['./house-update-status.component.css']
})
export class HouseUpdateStatusComponent {
  listStatus: Status[] = [];
  houseForm: FormGroup | undefined | any;
  id: number = 0;
  statusForm = new FormGroup ({
      id: new FormControl()
  })
  status: Status = {
    id: 0
  }

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private statusService: HouseStatusService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getSmartphone(this.id);
      this.initializeForm();
      this.getStatus();
    });
  }
  initializeForm(){
    this.houseForm = new FormGroup({
      houseName: new FormControl(),
      houseAddress: new FormControl(),
      bedrooms: new FormControl(),
      bathrooms: new FormControl(),
      rent: new FormControl(),
      description: new FormControl()
    });
  }

  ngOnInit() {
  }
  getStatus(){
    return this.statusService.getAll().subscribe(statusList => {
      this.listStatus = statusList;
    } )
  }
  getSmartphone(id: number) {
    return this.houseService.findById(id).subscribe(house => {
      this.houseForm = new FormGroup({
        houseName: new FormControl(house.houseName),
        houseAddress: new FormControl(house.houseAddress),
        bedrooms: new FormControl(house.bedrooms),
        bathrooms: new FormControl(house.bathrooms),
        rent: new FormControl(house.rent),
        description: new FormControl(house.description)
      });
    });
  }

  updateHouseStatus() {
    this.status = this.statusForm.value;
    let idStatus = Number(this.status.id);
    this.houseService.updateStatus(this.id, idStatus).subscribe(() => {
      alert("Cap nhat thanh cong");
    }, error => {
      console.log(error);
    })
  }
}

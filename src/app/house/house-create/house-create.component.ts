import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {HouseStatusService} from "../../service/house-status.service";
import {Status} from "../../model/status";
import {HouseDTO} from "../../model/houseDTO";
import {FormControl, FormGroup} from "@angular/forms";
import {HouseNotImage} from "../../model/houseNotImage";

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit{
    houseNotImage!: HouseNotImage;
    house: HouseDTO = {
      houseName: "",
      houseAddress: "",
      bedrooms: 0,
      bathrooms: 0,
      rent: 0,
      description: "",
      statusId: 0,
      image1: "",
      image2: "",
      image3: "",
    }
    houseForm: FormGroup | undefined | any;
    imageList: string[] = [];
    image!: string;
    houseStatusList: Status[] | undefined;
    downloadURL: any;
    fb: any;
  constructor(private houseService: HouseService,
              private storage: AngularFireStorage,
              private houseStatus: HouseStatusService,
  ) {
  }
  ngOnInit(): void {
    this.createForm();
    this.houseStatus.getAll().subscribe(result => {
      this.houseStatusList = result;
      console.log(this.houseStatusList)},
      error =>{
      console.log(error);
    })
  }
  createForm(){
     this.houseForm = new FormGroup({
      houseName: new FormControl(),
      houseAddress: new FormControl(),
      bedrooms: new FormControl(),
      bathrooms: new FormControl(),
      rent: new FormControl(),
      description: new FormControl(),
      statusId: new FormControl(),
    });
  }
    // @ts-ignore
    onFileSelected(event) {
      var n = Date.now();
      const file = event.target.files[0];
      const filePath = `RoomsImages/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`RoomsImages/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe((url: string) => {
              if (url) {
                this.fb = url;
              }
              console.log(this.fb);
              this.image = this.fb;
              this.imageList.push(this.image);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });
    }
  submit(){
    let image1 = this.imageList[0];
    let image2 = this.imageList[1];
    let image3 = this.imageList[2];
    this.houseNotImage = this.houseForm.value;
    console.log(this.houseNotImage)
    let id = Number(localStorage.getItem('ID'));
    this.house.houseAddress = String(this.houseNotImage.houseAddress);
    this.house.houseName = String(this.houseNotImage.houseName);
    this.house.bathrooms = Number(this.houseNotImage.bathrooms);
    this.house.bedrooms = Number(this.houseNotImage.bedrooms);
    this.house.rent = this.houseNotImage.rent;
    this.house.description = String(this.houseNotImage.description);
    this.house.statusId = Number(this.houseNotImage.statusId);
    this.house.image1 = image1;
    this.house.image2 = image2;
    this.house.image3 = image3;
    console.log(this.house);
    this.houseService.saveHouse(this.house, id).subscribe(() => {
      this.houseForm.reset();
      alert("done");
    }, error => {
      console.log(error);
    })
  }
}

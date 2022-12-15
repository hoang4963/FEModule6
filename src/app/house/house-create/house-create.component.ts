import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {HouseStatusService} from "../../service/house-status.service";

import {HouseDTO} from "../../model/houseDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HouseNotImage} from "../../model/houseNotImage";

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit {
  houseNotImage!: HouseNotImage;
  house: HouseDTO = {
    houseName: "",
    houseAddress: "",
    bedrooms: 0,
    bathrooms: 0,
    rent: 0,
    description: "",
    image1: "https://sieupet.com/sites/default/files/hinh_anh_meo_dep.jpg",
    image2: "https://sieupet.com/sites/default/files/hinh_anh_meo_dep.jpg",
    image3: "https://sieupet.com/sites/default/files/hinh_anh_meo_dep.jpg",
  }
  houseForm: FormGroup | undefined | any;
  imageList: string[] = [];
  listImageTest: string[] = [];
  image!: string;
  downloadURL: any;
  fb: any;
  files: File[] = [];

  //multiple File
  selectFile: File[] = [];
  arrFileInFireBase!: AngularFireStorageReference;
  arrUrlFormFireBase: any = [];
  @Output()
  arrUrl = new EventEmitter<string[]>();

  constructor(private houseService: HouseService,
              private storage: AngularFireStorage,
              private houseStatus: HouseStatusService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.houseForm = new FormGroup({
      houseName: new FormControl('', [Validators.required]),
      houseAddress: new FormControl('', [Validators.required]),
      bedrooms: new FormControl('',),
      bathrooms: new FormControl(''),
      rent: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      statusId: new FormControl(),
    });
  }

  get houseName() {
    return this.houseForm.get('houseName')
  }

  get houseAddress() {
    return this.houseForm.get('houseAddress')
  }

  get bedrooms() {
    return this.houseForm.get('houseAddress')
  }

  get description() {
    return this.houseForm.get('description')
  }

  get rent() {
    return this.houseForm.get('rent')
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

  uploadMultipleFile({$event}: { $event: any }) {
    console.log(`event`, $event)
    this.selectFile = $event.target.files;

  }

  upLoad() {

    for (let i = 0; i < this.selectFile.length; i++) {
      console.log(this.selectFile.length)

      this.arrFileInFireBase = this.storage.ref(this.selectFile[i].name);
      //put từng phần tử
      this.arrFileInFireBase.put(this.selectFile[i]).then(data => {
        return data.ref.getDownloadURL();
      }).then(url => {
        console.log("url", url)
        this.arrUrlFormFireBase.push(url);
        this.arrUrl.emit(this.arrUrlFormFireBase)
      }).catch(error => {
        console.log(`Upload Fail! ${error}`)
      })

    }

    console.log("eeeeee", this.arrUrlFormFireBase)


  }


  submit() {
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
    this.house.rent = Number(this.houseNotImage.rent);
    this.house.description = String(this.houseNotImage.description);
    if (image1 != null && image1 != "") {
      this.house.image1 = image1;
    }
    if (image2 != null && image2 != "") {
      this.house.image2 = image2;
    }
    if (image3 != null && image3 != "") {
      this.house.image3 = image3;
    }
    console.log(this.house);
    this.houseService.saveHouse(this.house, id).subscribe(() => {
      this.houseForm.reset();
      alert("done");

    }, error => {
      console.log(error);
    })
  }


}


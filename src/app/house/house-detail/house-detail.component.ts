import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HouseService} from "../../service/house.service";
import {Image} from "../../model/Image";
import {HouseCommentService} from "../../service/house-comment.service";
import {Comments} from "../../model/comment";
import {Rating} from "../../model/rating";
import {HouseRatingService} from "../../service/house-rating.service";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent {
  houseForm: FormGroup | any;
  houseId!: any;
  id: number | any;
  // @ts-ignore
  listImage: Image[];
  image1: any;
  image2: any;
  image3: any;
  houseName: any;
  Address: any;
  Rent!: any;
  description!: any;
  bedrooms!: any;
  bathrooms!: any;
  listComment: Comments[]=[];
  listRating: Rating[]=[];
  constructor(private houseService: HouseService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private houseCommentService: HouseCommentService,
              private houseRatingService: HouseRatingService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getHouse(this.id);
      this.initializeForm();
      this.getImage(this.id);
      this.getComment(this.id);
      this.getRating(this.id)
    });
  }

  ngOnInit() {
  }

  initializeForm() {
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
      this.houseId = house.id
      this.houseName = house.houseName
      this.Address = house.houseAddress
      this.Rent = house.rent
      this.description = house.description
      this.bedrooms = house.bedrooms
      this.bathrooms = house.bathrooms

      // this.houseForm = new FormGroup({
      //   Name: new FormControl(house.houseName),
      //   Address: new FormControl(house.houseAddress),
      //   Rent: new FormControl(house.rent),
      //   description: new FormControl(house.description),
      //   bedrooms: new FormControl(house.bedrooms),
      //   bathrooms: new FormControl(house.bathrooms),
      //   HouseStatus: new FormControl(house.status?.statusName)
      // });
    });
  }

  getImage(id: number) {
    return this.houseService.findImageByHouseId(id).subscribe(listImage => {
      // @ts-ignore
      this.listImage = listImage;
      console.log(listImage[0].imageName);
      this.image1 = listImage[0].imageName;
      this.image2 = listImage[1].imageName;
      this.image3 = listImage[2].imageName;
    })
  }


  getComment(id: number){
    return this.houseCommentService.getAll().subscribe(commentList => {
      this.listComment = commentList;
      console.log(this.listComment)
    } )
  }
  getRating(id: number){
    return this.houseRatingService.getAll().subscribe(ratingList => {
      this.listRating = ratingList;
      console.log(this.listComment)
    } )
  }
}

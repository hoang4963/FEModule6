import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  avatar: string = "";
  userForm = new  FormGroup  ({
      username: new FormControl(),
      fullName: new FormControl(),
      // avatar: new FormControl(),
      userAddress: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl()
    });
  id: number = 0;
  ngOnInit(){
    this.id = Number(localStorage.getItem('ID'));
    this.getUser(this.id);
  }
  constructor(private userService: UserService) {
  }
  getUser(id : number){
    return this.userService.getUserProfile(id).subscribe(user=>{
      this.userForm =  new FormGroup({
        username: new FormControl(user.username),
        fullName: new FormControl(user.fullName),
        // avatar: new FormControl(user.avatar),
        userAddress: new FormControl(user.userAddress),
        email: new FormControl(user.email),
        phoneNumber: new FormControl(user.phoneNumber)
      })
      this.avatar = String(user.avatar);
    })

  }

}

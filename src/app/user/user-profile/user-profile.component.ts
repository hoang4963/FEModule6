import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  iUser = localStorage.getItem("USERID")

  // @ts-ignore
  user?: User;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {

    // @ts-ignore
    this.userService.getUserProfile(this.iUser).subscribe(result => {
      this.user = result
      console.log(result)
    })
  }
}

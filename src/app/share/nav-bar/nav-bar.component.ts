import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service.service";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  userID: number = 0;
  userName?: any;
  avatar: any;
  id: number = 0;
  user?: User;
  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    this.activatedRoute.paramMap.subscribe((paramMap : ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getUser()
    });

  }
  ngOnInit(): void {
    let userid = Number(localStorage.getItem('ID'));
    this.userID = userid
    console.log(this.userID);
  }
  logout() {
    this.authenticationService.logout()
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ID");
    window.location.href = 'http://localhost:4200';
  }
  getUser(){
     let userid = Number(localStorage.getItem('ID'))
    this.userService.getUserProfile(userid).subscribe(res => {
      this.avatar = res.avatar;
      this.userName = res.username;
    })
  }
}

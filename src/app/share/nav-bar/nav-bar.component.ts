import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  userID: number = 0;
  constructor(private authenticationService: AuthenticationService) {
  }
  ngOnInit(): void {
    let id = Number(localStorage.getItem('ID'));
    this.userID = id
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
}

import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  constructor(private authenticationService: AuthenticationService) {
  }
  ngOnInit(): void {
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

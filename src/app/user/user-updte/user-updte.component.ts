import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-user-updte',
  templateUrl: './user-updte.component.html',
  styleUrls: ['./user-updte.component.css']
})
export class UserUpdteComponent implements OnInit{
  userForm: FormGroup | undefined | any;
  id: number =0;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getUser(this.id);
      this.initializeForm();
    });
  }
  initializeForm(){
    this.userForm = new FormGroup({
      fullName: new FormControl(),
      userAddress: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
    });
  }

  ngOnInit() {
    this.id = Number(localStorage.getItem('ID'));
    this.getUser(this.id);
  }

  getUser(id: number) {
    return this.userService.getUserProfile(id).subscribe(userr => {
      this.userForm = new FormGroup({
        fullName: new FormControl(userr.fullName),
        userAddress: new FormControl(userr.userAddress),
        email: new FormControl(userr.email),
        phoneNumber: new FormControl(userr.phoneNumber),
      });
    });
  }

  updateUser(id: number) {
    // @ts-ignore
    const userr = this.userForm.value;
    this.userService.updateUserProfile(id, userr).subscribe(() => {
      alert('Cập nhật thành công');
    }, e => {
      console.log(e);
    });
  }
}

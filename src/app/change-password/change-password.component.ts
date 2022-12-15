import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidators } from '../jwt/helper/password.validators';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username?: any;
  oldPw!:string;
  userId!: any;
  avatar!:any;
  formchange : FormGroup | undefined | any;
  //
  // })

  constructor(private userService: UserService,
    ) {
    this.initializeForm();
    this.changePassword();
  }
  changePassword() {
    let id = Number(localStorage.getItem('ID'))
    this.userService.getUserProfile(id).subscribe(res => {
      this.oldPw = String(res.password);
      this.username = res.username;
      this.userId = res.id;
      this.avatar = res.avatar
    })
    console.log(this.oldPw)
  }
  initializeForm()
  {
    this.formchange = new FormGroup({
      oldPassword: new FormControl (),
      newPassword: new FormControl (),
      cnfPassword: new FormControl ()
    });
  }
  checkPass(){
    let formPassword = this.formchange.value;
    console.log(formPassword.oldPassword);
    console.log(formPassword.newPassword)
    if (String(formPassword.oldPassword) == this.oldPw) {

      this.userService.changePassword(Number(localStorage.getItem('ID')),String(formPassword.newPassword)).subscribe(() => {
        alert("Thành công")
        this.formchange.reset();
        }, error => {
        console.log(error);
      })
    }

  }

  get oldPassword() {
    return String(this.formchange.get('oldPassword'));
  }

  get newPassword() {
    return this.formchange.get('newPassword');
  }
  get cnfPassword() {
    return this.formchange.get('cnfPassword');
  }
  ngOnInit() {
  }

}

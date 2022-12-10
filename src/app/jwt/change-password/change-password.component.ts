import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  form1: FormGroup;

  constructor(fb: FormBuilder){
    this.form1 = fb.group({
      'oldPwd': ['',Validators.required],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    });
  }
  get oldPwd(){
    return this.form1.get('oldPwd');
  }

  get newPwd(){
    return this.form1.get('newPwd');
  }

  get confirmPwd(){
    return this.form1.get('confirmPwd');
  }
}

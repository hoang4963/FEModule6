import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidators } from '../jwt/helper/password.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form = new FormGroup({

  })

  constructor(fb: FormBuilder) {
    // @ts-ignore
    this.form = fb.group({
      oldPassword: ['', Validators.required, PasswordValidators.invalidOldPwd],
      newPassword: ['', Validators.required],
      cnfPassword: ['', Validators.required]
    }, {validators: [PasswordValidators.passwordShouldMatch, PasswordValidators.oldAndNewPwdShouldNotMatch]})
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }
  get cnfPassword() {
    return this.form.get('cnfPassword');
  }
  ngOnInit() {
  }

}

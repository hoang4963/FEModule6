import { Component, OnInit } from '@angular/core';
// Import the User model
import { User } from '../model/user';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class RegisterComponent implements OnInit {

  //Inject the formbuilder into the constructor
  constructor(private fb:FormBuilder) {}

  //Property for the user
  // @ts-ignore
  private user:User;


  // @ts-ignore
  signupForm: FormGroup;
  ngOnInit() {

    // Use the formbuilder to build the Form model
    this.signupForm  = this.fb.group({
      username: ['',[Validators.required,
        Validators.minLength(8)]],
      password: this.fb.group({
        pwd: ['', [Validators.required,
          Validators.minLength(8)]],
        confirmPwd: ['', [Validators.required,
          Validators.minLength(8)]]

      }),
      gender: ['', Validators.required],
      terms: ['', Validators.requiredTrue]
    })

  }

  get username() { return this.signupForm.get('username'); }

  get password() { return this.signupForm.get('password'); }

  get email() { return this.signupForm.get('email'); }

  get phone() { return this.signupForm.get('phone'); }

  public onFormSubmit() {
    if(this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(this.user);
      /* Any API call logic via services goes here */
    }
  }
}

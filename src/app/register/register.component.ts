import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  signupForm! : FormGroup;
  constructor(private formBuilder: FormBuilder, private http : HttpClient,
              private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      phone:['',Validators.required],
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:8080/signup",this.signupForm.value)
      .subscribe(res=>{
        alert("Signup successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },err=>{
        alert("Please Try again");
      })

  }

}

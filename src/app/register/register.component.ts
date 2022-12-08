import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Register} from "../model/register";

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
      userName:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword:['',Validators.required],
      phone:['',Validators.required],
    })
  }
  signUp(){
    this.http.post<Register>("http://localhost:8080/register",this.signupForm.value)
      .subscribe(res=>{
        alert("Đăng ký tài khoản thành công");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },err=>{
        console.log(err);
        alert("Tài khoản đã tồn tại. Vui lòng đăng ký lại");
      })

  }

}

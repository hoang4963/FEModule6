import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Register} from "../model/register";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: Register = {
    userName: "",
    password: "",
    confirmPassword: "",
    phone: ""
  }

  signupForm = new FormGroup({
    userName : new FormControl('',[Validators.required, Validators.minLength(6)]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    phone: new FormControl('', [Validators.required, Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})\\b")])
  },{validators:this.validateAreEqual});
  constructor(private formBuilder: FormBuilder, private http : HttpClient,
              private router : Router) { }

  ngOnInit(): void {
    // this.signupForm = this.formBuilder.group({
    //   userName:['',Validators.required, Validators.minLength(6)],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword:['',Validators.required, Validators.minLength(6)],
    //   phone:['',Validators.required, Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})\\b")],
    //
    // })
  }
  signUp(){
    console.log(this.signupForm.value);
    this.http.post<Register>("http://localhost:8080/register",this.signupForm.value)
      .subscribe(res=>{
        alert("Đăng ký tài khoản thành công");
        this.signupForm.reset();
        this.router.navigate(['']);
      },err=>{
        console.log(err);
        alert("Tài khoản đã tồn tại. Vui lòng đăng ký lại");
      })

  }
  public validateAreEqual(c: AbstractControl): {notSame: boolean} | null {
    return  c.value.password  ===  c.value.confirmPassword ? null : {notSame: true};
  }

}

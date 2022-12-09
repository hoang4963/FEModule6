import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'reactive-form';
  contactForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email,Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
    phone: new FormControl('',[Validators.required,Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})\\b")]),
  },{validators:this.validateAreEqual});
  get userName(){
    return this.contactForm.get('userName');
  }
  get password(){
    return this.contactForm.get('password');
  }
  get confirmPassword(){
    return this.contactForm.get('confirmPassword');
  }
  get phone(){
    return this.contactForm.get('phone');
  }
  get email(){
    return this.contactForm.get('email');
  }


  onSubmit() {
    console.log(this.contactForm.value);
  }

  ngOnInit(): void {
  }
  public validateAreEqual(c: AbstractControl): {notSame: boolean} | null {
    return  c.value.password  ===  c.value.confirmPassword ? null : {notSame: true};
  }

}

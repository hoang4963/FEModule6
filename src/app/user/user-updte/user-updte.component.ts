import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import firebase from "firebase/compat";
import {User} from "../../model/user";

@Component({
  selector: 'app-user-updte',
  templateUrl: './user-updte.component.html',
  styleUrls: ['./user-updte.component.css']
})
export class UserUpdteComponent implements OnInit {
  image: string = "";
  downloadURL: any;
  fb: any;
  userUpdate: User = {
    fullName: "",
    avatar:  "",
    userAddress: "",
    email: "",
    phoneNumber: ""
}
  userForm = new FormGroup({
    fullName: new FormControl(),
    userAddress: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
  })
  id: number = 0;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getUser(this.id);
      // this.initializeForm();
    });
  }

  // initializeForm(){
  //   this.userForm = new FormGroup({
  //     fullName: new FormControl(),
  //     userAddress: new FormControl(),
  //     email: new FormControl(),
  //     phoneNumber: new FormControl(),
  //   });
  // }

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
   this.userUpdate.fullName = String(this.userForm.get("fullName"));
   this.userUpdate.userAddress = String(this.userForm.get("userAddress"));
   this.userUpdate.email = String(this.userForm.get("email"));
   this.userUpdate.phoneNumber = String(this.userForm.get("phoneNumber"));
   this.userUpdate.avatar = this.image;
    this.userService.updateUserProfile(id, this.userUpdate).subscribe(() => {
      alert('Cập nhật thành công');
      this.router.navigate(['/user',id]);
    }, e => {
      console.log(e);
    });
  }
  // @ts-ignore
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: string) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            this.image = this.fb;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}

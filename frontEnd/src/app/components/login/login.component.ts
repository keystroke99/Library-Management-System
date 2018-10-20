import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashservicesService } from '../../Services/dashservices.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  crtUserForm : FormGroup;
  isSubmitted : boolean = false;
  isSubmitted2 : boolean = false;
  userObject : any = {};
  logedSuc : boolean = false;
  logedfail : boolean = false;
  userCrtMes : boolean = false;
  resultObj : any = {
  //   user : any;
  // token : any;
  };
  
  constructor(
    private frmBuilder : FormBuilder,
    private routeSvc : Router,
    private DSvc : DashservicesService
  ) { }

  ngOnInit() {
    this.createrLoginForm();
    this.createUserForm();
  }

  createrLoginForm(){
    this.loginForm = this.frmBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get FrmControls(){
    return this.loginForm.controls;
  }
  onLoginSubmit(){
    const em = {
      email : this.loginForm.get('email').value,
      password : this.loginForm.get('password').value
    }
    this.isSubmitted = true;
      this.DSvc.onSubmitLogin(em).subscribe( data => {
        
        if(data.success === true) {
          this.resultObj = data.userData;
        console.log("user DATAAA");
        console.log(this.resultObj);
        this.isSubmitted = false;
        this.logedSuc = true;
        localStorage.setItem('memberID', this.resultObj._id);
        localStorage.setItem('role', this.resultObj.role);
        
        //this.DSvc.storeUserData(this.resultObj.token, this.resultObj.user);

        setTimeout(() =>{
          this.logedSuc = false;
          this.routeSvc.navigateByUrl('usermanagement');
        });
        } else {
          this.logedfail = true
          setTimeout(() => {
            this.logedfail = false;
          }, 1500);
        }
        
      });
     


  }

  createUserForm(){
    this.crtUserForm = this.frmBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],

      role: ['', Validators.required]
    });
  }

  
  
onSubmitUser(){
const userCreate = {
  firstName : this.crtUserForm.get('firstName').value,
  lastName : this.crtUserForm.get('lastName').value,
  email : this.crtUserForm.get('email').value,
  password : this.crtUserForm.get('password').value,
  phoneNumber : this.crtUserForm.get('phoneNumber').value,
  role : this.crtUserForm.get('role').value
}
this.isSubmitted2 = true;
this.DSvc.createUser(userCreate).subscribe(result => {
  console.log("cretttttttttttttttUSER");
  //this.allUsers();
  console.log(result);
  if(result.success){
    this.isSubmitted2 = false;
    this.userCrtMes = true;
    setTimeout(() => {
      this.userCrtMes = false;
    }, 1000);
  }
});
}
get FrmControls2(){
  return this.crtUserForm.controls;
}


}

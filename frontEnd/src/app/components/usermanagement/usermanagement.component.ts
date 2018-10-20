import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { DashservicesService } from '../../Services/dashservices.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {

  usermEdit: boolean = false;
  myData: {};
  myToken: any;
  userUpdMes: boolean = false;
  allUsersData: any = [];
  crtUserForm: FormGroup;
  updUserForm: FormGroup;
  userViewData: any = {};
  userCrtMes: boolean = false;
  updUserFRM: boolean = false;
  memId: any;
  userupdate: boolean = false;
  mfData: any[];
  msk: boolean = false;
  dsu: boolean = false;
  isSubmitted: boolean = false;
  email: string;

  constructor(
    private frmBuilder: FormBuilder,
    private routeSvc: Router,
    private DSvc: DashservicesService
  ) {
    this.userViewData = {};
  }

  ngOnInit() {

    this.allUsers();
    this.createUserForm();
    this.updateUserForm();

    this.routeSvc.routeReuseStrategy.shouldReuseRoute = function () { return false; }; this.routeSvc.events.subscribe((evt) => { if (evt instanceof NavigationEnd) { this.routeSvc.navigated = false; window.scrollTo(0, 0); } });

  }

  openUserEditBox(id) {
    // this.usermEdit = !this.usermEdit;
    this.usermEdit = id;
    return id;
  }
  closeUserEdit() {
    this.usermEdit = false;
  }

  openUpdFOrm(id) {
    this.updUserFRM = id;
    this.DSvc.openUser(id).subscribe(result => {
      this.userViewData = result.userData;
    });
    //return this.userViewData;

  }

  allUsers() {
    this.DSvc.getAllUsers().subscribe(result => {
      this.allUsersData = result.userData;
      console.log('users')
      console.log(this.allUsersData)
    });
  }

  createUserForm() {
    this.crtUserForm = this.frmBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],

      role: ['', Validators.required]
    });
  }



  onSubmitUser() {
    const userCreate = {
      firstName: this.crtUserForm.get('firstName').value,
      lastName: this.crtUserForm.get('lastName').value,
      email: this.crtUserForm.get('email').value,
      password: this.crtUserForm.get('password').value,
      phoneNumber: this.crtUserForm.get('phoneNumber').value,
      role: this.crtUserForm.get('role').value
    }
    this.isSubmitted = true;

    this.DSvc.createUser(userCreate).subscribe(result => {
      this.allUsers();
      if (result.success == true) {
        this.userCrtMes = true;
        window.location.reload();
        setTimeout(() => {
          this.userCrtMes = false;
        }, 1000);
      }
    });
  }

  updateUserForm() {
    this.updUserForm = this.frmBuilder.group({
      'userViewData.firstName': ['', Validators.required],
      'userViewData.lastName': ['', Validators.required],
      'userViewData.email': ['', Validators.required],
      'userViewData.phoneNumber': ['', Validators.required],
      'userViewData.password': ['', Validators.required],
      'userViewData.role': ['', Validators.required]
    });
  }

  onUpdateUser() {
    this.DSvc.updteUser(this.userViewData).subscribe(result => {
      this.allUsers();
      if (result.success == true) {
        this.userUpdMes = true;
        window.location.reload()
       // this.routeSvc.navigateByUrl('usermanagement')
        /* setTimeout( () => {
          window.location.reload()
          this.routeSvc.navigate(['/usermanagement/'])
          this.userupdate = false;
        },1000); */
      }
    });
  }

  getUserbyUserId(id) {
    this.DSvc.openUser(id).subscribe(result => {
      this.userViewData = result.userData;
      console.log('userrrrrrr')
      console.log(this.userViewData);
      localStorage.setItem('uid', this.userViewData._id);
      this.routeSvc.navigate(['/viewuser/', { id: id }])
    });
  }

  deleteUser(id) {
    this.DSvc.deleteUserById(id).subscribe(result => {
      console.log(result);
      this.msk = true;
      this.dsu = true;
      //this.routeSvc.navigate(['/usermanagement/', {id : id}])
    });
  }

  dltuser() {
    this.msk = false;
    this.dsu = false;
    this.allUsers();

  }

  get FrmControls() {
    return this.crtUserForm.controls;
  }


}

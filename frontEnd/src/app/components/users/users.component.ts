import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApicallsService } from "../../services/apicalls.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: []
})
export class UsersComponent implements OnInit {
  
  /* user: any: {
    firstName : String,
    lastName: String,
    email: String,
    phoneNumber: String,
    createdAt : Date,
    role: String
  } */

  constructor(private route: ActivatedRoute, public router: Router, private apiCallService: ApicallsService) { }
  myspin: boolean = true;
  registerForm: FormGroup;
  page: any;
  userCount: any;
  selectedValue: any = 50;
  users: any;
  usersList: any = [];
  def = true;
  dude = false;
  user: any;
  userObj: any;
  fasak: boolean = false;
  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: String;
  role: String;
  ngOnInit() {
    this.onGetAllUsersList()
    
  }

  onGetAllUsersList() {
    this.apiCallService.getUsers().subscribe(data => {
      this.def = false;
      this.dude = true;
      this.usersList = data.userData;
      this.userCount = this.usersList.length;
    });
  }

  viewUser(id) {
    this.fasak = true;
    this.apiCallService.getUserById(id).subscribe(data => {
      this.userObj = data.userData;
    });
  }

  deleteUser(id) {
    this.apiCallService.deleteUserById(id).subscribe(data => {
      this.userObj = data;
      if(this.userObj.success == true) {
        alert('user deleted successfully!')
        window.location.reload();
      } else {
        alert(this.user.message)
      }
    });
  }

  onSubmit() {
    console.log('user obj')
    console.log(this.firstName);
    console.log(this.lastName)
    console.log(this.role)
    console.log(this.email)
  }

}

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { DashservicesService } from '../../Services/dashservices.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'booksmanagement',
  templateUrl: './booksmanagement.component.html',
  styleUrls: ['./booksmanagement.component.css']
})
export class BooksmanagementComponent implements OnInit {
  booksData: any = [];
  mfData: any[];
  crtBookForm: FormGroup;
  userCrtMes : boolean;
  isSubmitted : boolean = false;
  msk : boolean = false;
  dsu : boolean = false;
  updUserFRM: boolean = false;
  userUpdMes: boolean = false;
  bookViewData: any = {};

  constructor(
    private frmBuilder : FormBuilder,
    private routeSvc : Router,
    private DSvc : DashservicesService
  ) {
    this.bookViewData = {};
  }

  ngOnInit() {
    this.getTotalBooks();
    this.createBookForm();
  }

  getTotalBooks(){
    this.DSvc.getAllBooks().subscribe(result => {
      
      this.booksData = result.userData;
      console.log("bookssssssssssss");
      console.log(this.booksData)
    });
  }

  createBookForm(){
    this.crtBookForm = this.frmBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publisher: ['', Validators.required],
      publishedYear: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  onSubmitBook(){
    const bookCreate = {
      title : this.crtBookForm.get('title').value,
      description : this.crtBookForm.get('description').value,
      author : this.crtBookForm.get('author').value,
      isbn : this.crtBookForm.get('isbn').value,
      publisher : this.crtBookForm.get('publisher').value,
      publishedYear : this.crtBookForm.get('publishedYear').value,
      quantity : this.crtBookForm.get('quantity').value
    }
    this.isSubmitted = true;
    this.DSvc.createBook(bookCreate).subscribe(result => {
      this.getTotalBooks();
      if(result.success){
        this.isSubmitted = false;
        this.userCrtMes = true;
        setTimeout(() => {
          this.userCrtMes = false;
        }, 1000);
      }
    });
    }

    openUpdFOrm(id) {
      this.updUserFRM = id;
      console.log(id)
      this.DSvc.openBook(id).subscribe(result => {
        this.bookViewData = result.bookData
      });
      //return this.bookViewData;
  
    }

    onUpdateBook() {
      console.log(this.bookViewData)
      this.DSvc.updteBook(this.bookViewData).subscribe(result => {
        this.getTotalBooks();
        if (result.success == true) {
          this.userUpdMes = true;
          window.location.reload()
        }
      });
    }

    get FrmControls(){
      return this.crtBookForm.controls;
    }

    deleteBook(id){
      this.DSvc.deleteBookById(id).subscribe(result => {
        console.log(result);
        this.msk = true;
        this.dsu =true;
      });
    }
    
    dltBook(){
      this.msk = false;
      this.dsu =false;
      this.getTotalBooks();
      
    }

}

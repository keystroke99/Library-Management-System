import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpInterceptor, HttpClient ,HttpParams  } from '@angular/common/http';

import { Http, Headers, Response, RequestOptions  } from '@angular/http';
import { Observable, Subject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Injectable()
export class DashservicesService {

  private isUserLoggedIn:Subject<any>
    result : any;
    id: number;
    _id: any;
    authToken;
    user;
    options;
    memberId;
    Authorization: any;
    firstName: any;
    lastName: any;
    email: any;
    phoneNumber: any;
    title: any;
    isbn: any;
    author: any;
    description: any;
    publisher: any;
    publishedYear: any;
    quantity: any;

    private HttpHeaders;
    myData : {};

  baseUrl = "http://159.69.21.13:3000/";
  // baseUrl = "http://localhost:3000/";
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.authToken = localStorage.getItem('Authorization');
    console.log(this.authToken)
  }

  createUser(userCreate){
    let body : any = {};
    body.firstName = userCreate.firstName;
    body.lastName = userCreate.lastName;
    body.email = userCreate.email;
    body.phoneNumber = userCreate.phoneNumber;
    body.password = userCreate.password;
    body.role = userCreate.role;
    return this.http.post(this.baseUrl + "v1/users/create", body).pipe(map((response: any) => response));
  }
  

  onSubmitLogin(member){
    let em : any = {}
    em.email = member.email;
    em.password = member.password;
    
    return this.http.post(this.baseUrl + 'v1/users/loginUser', em).pipe(map((response: any) => response));
  }

  getAllUsers(){
    return this.http.get(this.baseUrl + 'v1/users/getAllUsers' ).pipe(map((response: any) => response));
  }

  getAllListings(){
    return this.http.get(this.baseUrl + "listings/getAll").pipe(map((Response : any) => Response));
  }

  //Create Listing

  createListing(crtList,images){
    let formData = new FormData();
    formData.append('amenities',crtList.amenities);
    formData.append('area',crtList.area);
    formData.append('typeOfSale',crtList.typeOfSale);
    formData.append('areainSqFt',crtList.areainSqFt);
    formData.append('city',crtList.city);
    formData.append('listingTitle',crtList.listingTitle);
    formData.append('noOfBQ',crtList.noOfBQ);
    formData.append('noOfBathRooms',crtList.noOfBathRooms);
    formData.append('noOfBedRooms',crtList.noOfBedRooms);
    formData.append('noOfSittingRooms',crtList.noOfSittingRooms);
    formData.append('postalCode',crtList.postalCode);
    formData.append('price',crtList.price);
    formData.append('propertyType',crtList.propertyType);
    formData.append('state',crtList.state);
    formData.append('createdBy',crtList.createdBy);
    for(let item of images){
    formData.append('media',item,item.name);
    }
    
    // let body : any = {};
    // body.amenities = crtList.amenities;
    // body.area = crtList.area;
    // body.typeOfSale = crtList.typeOfSale;
    // body.listingDescription = crtList.typeOfSale;
    // body.areainSqFt = crtList.areainSqFt;
    // body.city = crtList.city;
    // body.listingTitle = crtList.listingTitle;
    // body.noOfBQ = crtList.noOfBQ;
    // body.media = crtList.media;
    // body.noOfBathRooms = crtList.noOfBathRooms;
    // body.noOfBedRooms = crtList.noOfBedRooms;
    // body.noOfSittingRooms = crtList.noOfSittingRooms;
    // body.postalCode = crtList.postalCode;
    // body.price = crtList.price;
    // body.propertyType = crtList.propertyType;
    // body.state = crtList.state;
    // body.createdBy = crtList.createdBy;
    return this.http.post(this.baseUrl + 'listings', formData).pipe(map((response: any) => response));
    

   
    //return this.http.post(this.baseUrl + "listings", JSON.stringify({ body : body, formData : new FormData() }), { headers: {'Authorization' : localStorage.getItem('Authorization')}}).pipe(map((response: any) => response));
  //  return this.http.post(this.baseUrl + "listings", formData, { headers}).pipe(map((response: any) => response));
  }

//View User

openUser(id){
  return this.http.get(this.baseUrl + "v1/users/getByUserId/" + id + "").pipe(map((response: any) => response));
}

openListData(id){
  return this.http.get(this.baseUrl + "listings/getByListingId/" + id + "").pipe(map((response: any) => response));
}

//Requests Get All
getAllRequests(){
  return this.http.get(this.baseUrl + "submitRequest/getAll" ).pipe(map((response: any) => response));
}

updteUser(userViewData){
  let userBody = {
    firstName : userViewData.firstName,
    lastName  : userViewData.lastName,
    email     : userViewData.email,
    phoneNumber : userViewData.phoneNumber,
    role      : userViewData.role
  }
  return this.http.put(this.baseUrl + "v1/users/updateByUserId/"+userViewData._id , userBody).pipe(map((response: any) => response));
}

openBook(id){
  return this.http.get(this.baseUrl + "v1/books/getByBookId/" + id + "").pipe(map((response: any) => response));
}


updteBook(bookViewData){
  let bookBody = {
    title : bookViewData.title,
    description : bookViewData.description,
    author: bookViewData.author,
    isbn: bookViewData.isbn,
    publisher: bookViewData.publisher,
    publishedYear: bookViewData.publishedYear,
    quantity: bookViewData.quantity
  }
  return this.http.put(this.baseUrl + "v1/books/updateByBookId/"+bookViewData._id, bookBody).pipe(map((response: any) => response));
}

getAllBooks(){
  return this.http.get(this.baseUrl + "v1/books/getAllBooks").pipe(map((response: any) => response));
}

deleteUserById(id){
  return this.http.delete(this.baseUrl + "v1/users/deleteByUserId/" + id).pipe(map((response: any) => response));
}
createBook(bookCreate){
  let body : any = {};
  body.title = bookCreate.title;
  body.description = bookCreate.description;
  body.author = bookCreate.author;
  body.isbn = bookCreate.isbn;
  body.publisher = bookCreate.publisher;
  body.publishedYear = bookCreate.publishedYear;
  body.quantity = bookCreate.quantity;
  return this.http.post(this.baseUrl + "v1/books/create", body).pipe(map((response: any) => response));
}

deleteBookById(id){
  return this.http.delete(this.baseUrl + "v1/books/deleteByBookId/" + id).pipe(map((response: any) => response));
}

}

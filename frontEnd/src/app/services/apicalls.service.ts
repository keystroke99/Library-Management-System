import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {
  url: string;
  Users: any;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/'; // Demo
  }

  getUsers() {
    return this.http.get(this.url + 'v1/users/getAllUsers').pipe(map((response: any) => response));
  }

  getUserById(id) {
    return this.http.get(this.url + 'v1/users/getByUserId/' + id).pipe(map((response: any) => response));
  }

  deleteUserById(id) {
    return this.http.delete(this.url + 'v1/users/deleteByUserId/' + id).pipe(map((response: any) => response));
  }
}

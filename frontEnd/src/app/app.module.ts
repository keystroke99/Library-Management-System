import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HttpClientJsonpModule, HttpHeaders  } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import {DataTableModule} from "angular-6-datatable";

import { DashservicesService } from './Services/dashservices.service';
import { LeftnavComponent } from './Components/leftnav/leftnav.component';
import { TopheaderComponent } from './Components/topheader/topheader.component';
import { UsermanagementComponent } from './Components/usermanagement/usermanagement.component';
import { BooksmanagementComponent } from './components/booksmanagement/booksmanagement.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    LeftnavComponent,
    TopheaderComponent,
    UsermanagementComponent,

    BooksmanagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    HttpModule,
    DataTableModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    
    RouterModule.forRoot([
      { path : '', redirectTo : 'login', pathMatch : 'full'},
      { path : 'login', component : LoginComponent},

      { path : 'usermanagement', component : UsermanagementComponent},
      { path : 'booksmanagement', component : BooksmanagementComponent}

    ])
  ],
  providers: [
    DashservicesService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

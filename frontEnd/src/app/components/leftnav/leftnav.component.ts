import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {

  public navPages = "";
  sNav : boolean = false;
  constructor(
    private routeSvc: Router,
  ) { }

  dashboard(){
    this.routeSvc.navigateByUrl('dashboard');
  }
  um(){
    this.routeSvc.navigateByUrl('usermanagement');
  }
  bm(){
    this.routeSvc.navigateByUrl('booksmanagement');
    
  }
  

  ngOnInit() {
    let urlBreakup = this.routeSvc.url.split('/');
    this.navPages = urlBreakup[1];
  }

  openSubNav(){
    this.sNav = !this.sNav;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApicallsService } from "../../services/apicalls.service";

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loading = false;
    submitted = false;
    returnUrl: string;
    email: string;
    password: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router, private apiCallService: ApicallsService) {}

    ngOnInit() {

        // reset login status
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    onSubmit() {
        this.submitted = true;
        console.log(this.email)
        console.log(this.password)
        // stop here if form is invalid
        this.loading = true;
    }
}

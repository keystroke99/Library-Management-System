import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    loading = false;
    submitted = false;

    constructor(
        private router: Router,) { }

    ngOnInit() {
    }


    onSubmit() {
        this.submitted = true;

        
        this.loading = true;
        // this.userService.register(this.registerForm.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}

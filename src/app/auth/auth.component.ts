import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('loginState', [
      state('shown', style({
        transform: 'translateX(0px)',
        opacity: 1,
        visibility: 'visible'
      })),
      state('hidden', style({
        transform: 'translateX(-200px)',
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('shown <=> hidden', animate(500)),
    ]),
    trigger('errorState', [
      state('shown', style({
        transform: 'translateX(0px)',
        opacity: 1,
        visibility: 'visible'
      })),
      state('hidden', style({
        transform: 'translateY(-50px)',
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('shown <=> hidden', animate(300)),
    ]),

  ]
})
export class AuthComponent implements OnInit {
  
  loginState = "hidden";
  signupState = "shown";
  errorState = "hidden";

  user = {};
  errors;
  userType;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  setUserType(value: string) {
    this.userType = value;
  }

  onSubmitRegister(form: NgForm) {
    if (!form.valid) {
      return;
    }
  	const fullName = form.value.fullName;
  	const login = form.value.login;
  	const password = form.value.password;
    const className = form.value.className;
    const type = this.userType;

    this.user = {login: login, password: password, fullName: fullName, className: className, type: type};
    console.log(form);

    this.authService.register(this.user).subscribe((result: {token: string, id: string, type: string}) => {
      console.log(result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.id);
      const time = 60 * 60 * 1000 * 24;
      const expiryDate = new Date(
        new Date().getTime() + time
        );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      this.setAutoLogout(time);
      this.router.navigate(['/', type]);
    }, errors => {
      console.log(errors);
      
      this.getErrorMessage(errors, form);
    });
  }

  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const login = form.value.login;
    const password = form.value.password;

    this.user = {login: login, password: password};

    this.authService.login(this.user).subscribe((result: {token: string, id: string, type: string}) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.id);
        const time = 60 * 60 * 1000 * 24;
        const expiryDate = new Date(
          new Date().getTime() + time
          );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(time);
        this.router.navigate(['/', result.type]);
    }, errors => {
      this.getErrorMessage(errors, form);
      console.log(errors);
    });
  }

  getErrorMessage(errors, form) {
    if (errors) {
        this.errorState = "shown";
        
        this.errors = errors;
        errors.forEach(error => {
          form.controls[error.param].setErrors({'incorrect': true});
        });

        setTimeout(() => {
          this.errorState = "hidden";
        }, 3000);
      }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.errorState = "hidden";
    this.errors = [];
    this.userType = '';
    this.user = {};
  }

  setAutoLogout = time => {
    setTimeout(() => {
      this.logOut();
    }, time);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
  }

  onSwitchToLogin(form) {
    this.loginState = "shown";
    this.signupState = "hidden";
    this.resetForm(form);
    console.log("ha");
  }
  onSwitchToSignup(form) {
    this.loginState = "hidden";
    this.signupState = "shown";
    this.resetForm(form);
    console.log("ha");
  }
}

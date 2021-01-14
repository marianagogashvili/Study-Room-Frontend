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
    trigger('slideState', [
      state('shown', style({
        transform: 'rotateY(0px)',
        opacity: 1,
        visibility: 'visible'
      })),
      state('hidden', style({
        transform: 'rotateY(180deg)',
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('shown <=> hidden', animate(500)),

    ])
  ]
})
export class AuthComponent implements OnInit {
  registerState = "shown";
  selectTypeState = "hidden";
  selectClassState = "hidden";

  loginState = "hidden";
  signupState = "shown";

  user;
  errors;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmitRegister(form: NgForm) {
    if (!form.valid) {
      return;
    }
  	const fullName = form.value.fullName;
  	const login = form.value.login;
  	const password = form.value.password;

    this.user = {login: login, password: password, fullName: fullName};

    this.selectTypeState = "shown";
    this.registerState = "hidden";
  }

  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const login = form.value.login;
    const password = form.value.password;

    this.user = {login: login, password: password};
    console.log(this.user);
    this.authService.login(this.user).subscribe((result: {token: string, id: string}) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.id);
        const time = 60 * 60 * 1000 * 24;
        const expiryDate = new Date(
          new Date().getTime() + time
          );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(time);
    }, errors => {
      this.errors = errors;
      console.log(errors);
    });
  }

  onSelectType(type)
  { 
    this.user.type = type;
    if (type === 'teacher') {
      this.authService.register(this.user).subscribe(result => {
        console.log(result);
      }, errors => {
        this.errors = errors;
        console.log(errors);
      });
      // this.router.navigate(['/teacher', ]);
    } else {
      this.selectTypeState = "hidden";
      this.selectClassState = "shown";
    }
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

  onSelectClass(className) {
    this.user.className = className.value;
    this.authService.register(this.user).subscribe(result => {
      
    }, errors => {
      this.errors = errors;
      console.log(errors);
    });
    // this.router.navigate(['/student', ]);
  }

  onSwitchToLogin() {
    this.loginState = "shown";
    this.signupState = "hidden";
    console.log("ha");
  }
  onSwitchToSignup() {
    this.loginState = "hidden";
    this.signupState = "shown";
    console.log("ha");

  }
}

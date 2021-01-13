import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('slideState', [
      state('shown', style({
        transform: 'translateX(0px)',
        opacity: 1,
        visibility: 'visible'
      })),
      state('hidden', style({
        transform: 'translateX(200px)',
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

  user;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
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

  onSelectType(type){ 
    this.user.type = type;
    if (type === 'teacher') {
      this.authService.register(this.user).subscribe(result => {
        console.log(result);
      });
      // redirect to teacher page
    } else {
      this.selectTypeState = "hidden";
      this.selectClassState = "shown";
    }
  }

  onSelectClass(className) {
    this.user.className = className.value;
    this.authService.register(this.user).subscribe(result => {
      console.log(result);
    });
    // redirect to student page
  }

}

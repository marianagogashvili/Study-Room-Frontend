import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

type Teacher = {
	firstLogin: string,
	fullName: string,
	lastLogin: string,
	login:  string,
	password: string
};

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
  animations: [
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
    ])
  ]
})
export class EditTeacherComponent implements OnInit {
  @Output() showEditVal: EventEmitter<any> = new EventEmitter<any>();
  teacher:any = {};
  savedVal: {name: string, login: string} = {name: '', login: ''};
  errors;
  errorState = 'hidden';

  constructor(private teacherService: TeacherService,
  			  private router: Router) { }

  ngOnInit() {
  	const id = localStorage.getItem('userId');
  	this.teacherService.getTeacher({id: id}).subscribe((teacher: Teacher) => {
		this.teacher = teacher;
		this.savedVal.name = teacher.fullName;
		this.savedVal.login = teacher.login;
  		console.log(this.teacher);
  	}, error => {
  		this.teacherService.sendError(error);
  		this.router.navigate(['/']);
  	});



  }

  onSubmitEdit(form: NgForm) {
  	if (!form.valid) {
      return;
    }
    const id = localStorage.getItem('userId');
  	const fullName = form.value.fullName;
  	const login = form.value.login;
  	const oldPassword = form.value.oldPassword;
    const newPassword = form.value.newPassword;

    if (fullName === this.savedVal.name && login === this.savedVal.login && oldPassword === newPassword) {
    	this.errors = [{msg: "You haven't changed anything"}];
  		this.errorState = 'shown';
  		setTimeout(() => {
  			this.errorState = 'hidden';
  		}, 2000);
    } else {
    	const user = {id: id, fullName: fullName, login: login, oldPassword: oldPassword, newPassword: newPassword};

	  	this.teacherService.editTeacher(user).subscribe((result: {message: string, teacher: Teacher}) => {
			this.teacherService.sendTeacher(result.teacher);
			this.showEditVal.emit(false);
	  	}, error => {
	  		this.errors = error;
	  		error.forEach(err => {
	          form.controls[err.param].setErrors({'incorrect': true});
	        });
	  		this.errorState = 'shown';
	  		setTimeout(() => {
	  			this.errorState = 'hidden';
	  		}, 2000);
	  	});
    }

  }

}

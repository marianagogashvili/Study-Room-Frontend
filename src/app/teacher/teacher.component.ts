import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  // animations: [
  // trigger('courseState', [
  //     state('shown', style({
  //       transform: 'translateX(0px)',
  //       opacity: 1,
  //       visibility: 'visible'
  //     })),
  //     state('hidden', style({
  //       transform: 'translateY(-200px)',
  //       opacity: 0,
  //       visibility: 'hidden'
  //     })),
  //     transition('shown <=> hidden', animate(300)),
  //   ]),
  // trigger('courseState2', [
	 //  state('shown', style({
	 // 	display: 'block'
	 //  })),
	 //  state('hidden', style({
		// display: 'none'
	 //  })),
	 //  transition('shown => hidden', animate('0ms 200ms')),
	 //  transition('hidden => shown', animate('0ms ease')),
  // 	]),
  // ]
})
export class TeacherComponent implements OnInit {
  teacher = {};
  courses;
  
  showEdit = false;
  showCourse = false;

  courseState = 'hidden';

  loading;

  constructor(private teacherService: TeacherService,
  			  private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  	this.loading = true;

  	this.teacherService.teacher.subscribe(result => {
  		console.log(result);
  		if (result !== null) {
  			this.teacher = result;
  			this.loading = false;
  		}
  	});

  	this.teacherService.getTeacher().subscribe((teacher: {courses}) => {
  		this.teacher = teacher;
  		this.courses = teacher.courses;
  		this.loading = false;
  		console.log(this.teacher);
  	}, error => {
  		this.teacherService.sendError(error);
  		this.router.navigate(['/']);
  	});


  }


  showCourseForm() {
  	this.showCourse = !this.showCourse;
  }

  showEditPage() {
	this.showEdit = true;
  }

  getEditVal(val) {
  	this.showEdit = val;
  }

  getCourseVal(val) {
  	if (val !== '') {
  		this.showCourse = false;
  		this.courses.push(val);
  	}
  }

}

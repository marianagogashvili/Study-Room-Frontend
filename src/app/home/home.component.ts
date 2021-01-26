import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { CoursesService } from '../course/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {

  error;
  errorState = 'hidden';

  subscription: Subscription;

  constructor(private studentService: StudentService,
  			  private teacherService: TeacherService,
  			  private coursesService: CoursesService) { }

  ngOnInit() {
  	this.subscription = this.studentService.error.subscribe(error => {
  		console.log(error);
  		if (error) {
  			setTimeout(() => {
	  			this.errorState = 'shown';
	  		}, 1000);
  			this.error = error;
	  		setTimeout(() => {
	  			this.errorState = 'hidden';
	  		}, 3000);
	  		console.log(error);
  		}
  	});
  	this.subscription = this.teacherService.error.subscribe(error => {
  		if (error) {
  			setTimeout(() => {
	  			this.errorState = 'shown';
	  		}, 1000);
  			this.error = error;
	  		setTimeout(() => {
	  			this.errorState = 'hidden';
	  		}, 3000);
	  		console.log(error);
  		}
  	});
  	this.subscription = this.coursesService.error.subscribe(error => {
  		if (error) {
  			setTimeout(() => {
	  			this.errorState = 'shown';
	  		}, 1000);
  			this.error = error;
	  		setTimeout(() => {
	  			this.errorState = 'hidden';
	  		}, 3000);
	  		console.log(error);
  		}
  	});
  }

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }

}

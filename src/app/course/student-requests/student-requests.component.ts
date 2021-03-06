import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../courses.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-requests',
  templateUrl: './student-requests.component.html',
  styleUrls: ['../students/students.component.css',
  			  './student-requests.component.css']
})
export class StudentRequestsComponent implements OnInit {
  requests;
  acceptIcon = faCheckCircle;

  courseId;
  loading;

  constructor(private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loading = true;
  	this.route.parent.params.subscribe(params => {
  		this.courseId = params['id'];
  		this.courseService.getCourse({id: this.courseId}).subscribe((course: {requests}) => {
  			console.log(course);
  			this.requests = course.requests;
  			this.loading = false;
  		});
  	});
  	
  }

  acceptStudent(student) {
  	this.courseService
  		.acceptStudent({courseId: this.courseId, studentId: student._id})
  		.subscribe(result => {
  			this.requests.forEach(stud => {
  				if (stud._id === student._id) {
  					stud.accepted = true;
  				}
  			})
  			console.log(result);
  	});
  }

  acceptAllStudents() {
  	this.courseService
  		.acceptAllStudents({courseId: this.courseId})
  		.subscribe(result => {
  			this.requests.forEach(stud => stud.accepted = true);
  			console.log(result);
  	});
  }

}

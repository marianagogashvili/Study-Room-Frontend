import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {
  // loading;
  studentsSub;
  sub2: Subscription;

  courseId;
  students;
  userType;

  crossIcon = faTimesCircle;

  constructor(private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.sub2 = this.courseService.allowedUser.subscribe(type => {
  		this.userType = type;
  	});

  	this.studentsSub = this.courseService.oldStudents.subscribe(students => {
  		this.students = students;
  	});

  	this.route.parent.params.subscribe(params => {
  		this.courseService.getStudentsOfCourse(
  			{ id: params['id'] })
  			.subscribe((course: {_id: string, students}) => {
  				this.courseId = course._id
  				this.students = course.students;
  				
  				this.courseService.sendStudentsToSelf(this.students);
  				console.log(this.students);
  			})
  	});
  	
  } 

  removeStudent(student) {
  	this.courseService.deleteStudentFromCourse(
  		{studentId: student._id, courseId: this.courseId })
  		.subscribe(result => {
  			let newStudents = this.students.filter(stud => stud._id !== student._id);
  			this.courseService.sendStudentsToSelf(newStudents);
  	});
  }

  deleteAllStudents() {
  	this.courseService.deleteAllStudents(
  		{courseId: this.courseId })
  		.subscribe(result => {
  			this.students = [];
  	});
  }

  ngOnDestroy() {
  	this.studentsSub.unsubscribe();
  	this.sub2.unsubscribe();
  }
}

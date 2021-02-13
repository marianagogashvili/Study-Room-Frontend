import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { CoursesService } from '../courses.service';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {
  // loading;
  studentsSub;
  searchForm: FormGroup;
  sub2: Subscription;

  groups;

  courseId;
  defaultStudents;
  students;
  userType;

  crossIcon = faTimesCircle;
  redoIcon = faRedo;

  constructor(private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.searchForm = new FormGroup({
  		'fullName': new FormControl(),
  		'login': new FormControl(),
  		'group': new FormControl(),
  	});

  	this.sub2 = this.courseService.allowedUser.subscribe(type => {
  		this.userType = type;
  	});

  	this.studentsSub = this.courseService.oldStudents.subscribe(students => {
  		this.students = students;
  		this.defaultStudents = students;
  	});

  	this.courseService.getGroups().subscribe(groups => {
  		this.groups = groups;
  	});

  	this.route.parent.params.subscribe(params => {

  		this.courseService.getStudentsOfCourse(
  			{ id: params['id'] })
  			.subscribe((course: {_id: string, students}) => {
  				this.courseId = course._id
  				this.students = course.students;
  				this.defaultStudents = course.students;
  				this.courseService.sendStudentsToSelf(this.students);
  				console.log(this.students);
  			})
  	});
  	
  }
  clearSearch() {
  	this.searchForm.patchValue({'fullName': '', 'login': '', 'group': ''});
  	this.students = this.defaultStudents;
  } 

  findStudents() {
  	const name = this.searchForm.value.fullName;
  	const login = this.searchForm.value.login;
  	const group = this.searchForm.value.group;


    this.students = this.defaultStudents.filter(student => (name ? student.fullName.toLowerCase().includes(name.toLowerCase()) : true) 
  			&& (login ? student.login.includes(login) : true) &&
  			(group ? student.group.name === group : true)
  		// }
  	);
  	console.log(this.students);

 //  	this.courseService.findStudents(
	// 	{fullName: name, login: login, group: group, courseId: this.courseId})
	// 	.subscribe(students => {
	// 		console.log(students);
	// 		// this.students = students;
	// });
  }

  removeStudent(student) {
  	this.courseService.deleteStudentFromCourse(
  		{studentId: student._id, courseId: this.courseId })
  		.subscribe(result => {
  			let newStudents = this.defaultStudents.filter(stud => stud._id !== student._id);
  			this.searchForm.patchValue({'fullName': '', 'login': '', 'group': ''});
  			this.courseService.sendStudentsToSelf(newStudents);
  	});
  }

  deleteAllStudents() {
  	this.courseService.deleteAllStudents(
  		{courseId: this.courseId })
  		.subscribe(result => {
  			this.students = [];
  			this.defaultStudents = [];
  	});
  }

  ngOnDestroy() {
  	this.studentsSub.unsubscribe();
  	this.sub2.unsubscribe();
  }
}

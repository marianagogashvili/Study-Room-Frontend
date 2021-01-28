import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  groups;
  foundStudents:any = [];

  findStudentForm: FormGroup;

  minusIcon = faMinusCircle;
  redoIcon = faRedo;

  constructor(private courseService: CoursesService,
  	private router: Router) { }

  ngOnInit() {
  	this.courseService.getGroups().subscribe(groups => {
  		this.groups = groups;
  		console.log(groups);
  	});
  	this.findStudentForm = new FormGroup({
  		'fullName': new FormControl(''),
  		'login': new FormControl(''),
  		'group': new FormControl(''),
  	});
  }

  findStudents() {
  	const fullName = this.findStudentForm.value.fullName;
  	const login = this.findStudentForm.value.login;
  	const group = this.findStudentForm.value.group;

	this.courseService.findStudents(
		{fullName: fullName, login: login, group: group, courseId: this.courseService.courseId})
		.subscribe(students => {
			this.foundStudents = students;
	});
  }

  addStudents() {
  	this.courseService.addStudentsToCourse(
  		{courseId: this.courseService.courseId, 
  		 students: this.foundStudents}).subscribe(result => {
  		 	this.router.navigate(['/course/' + this.courseService.courseId + '/students']);
  		 });
  }

  removeStudent(index) {
  	this.foundStudents.splice(index, 1);
  	console.log(this.foundStudents);
  }

  removeAllStudents() {
  	this.foundStudents = [];
  }

}

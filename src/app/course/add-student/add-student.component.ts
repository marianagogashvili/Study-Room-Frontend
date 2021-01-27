import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  groups;
  foundStudents;

  findStudentForm: FormGroup;

  minusIcon = faMinusCircle;

  constructor(private courseService: CoursesService) { }

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
		{fullName: fullName, login: login, group: group})
		.subscribe(foundStudents => {
			this.foundStudents = foundStudents;
	});
  }

}

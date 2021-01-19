import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacher = {};
  groups;
  showEdit = false;
  students;

  constructor(private teacherService: TeacherService,
  			  private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  	this.authService.getGroups().subscribe(groups => {
      this.groups = groups;
      console.log(groups);
    });
  	this.teacherService.teacher.subscribe(result => {
  		if (result !== null) {
  			this.teacher = result;
  		}
  		console.log(this.teacher);
  	});

  	const id = localStorage.getItem('userId');
  	this.teacherService.getTeacher({id: id}).subscribe(teacher => {
  		this.teacher = teacher;
  		console.log(this.teacher);
  	}, error => {
  		this.teacherService.sendError(error);
  		this.router.navigate(['/']);
  	});
  }

  onSubmitCourse(form: NgForm) {

  }

  findStudent(name: string) {
  	// setTimeout(() => {
  		if (name !== '') {
  			this.teacherService.findStudent({name: name}).subscribe(students => {
		  		console.log(students);
		  		this.students = students;
		  	});
  		} 
  	// }, 3000);
  }

  showEditPage() {
	this.showEdit = true;
  }

  getEditVal(val) {
  	this.showEdit = val;
  }

}

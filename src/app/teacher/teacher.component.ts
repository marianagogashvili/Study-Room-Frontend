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
  animations: [
  trigger('courseState', [
      state('shown', style({
        transform: 'translateX(0px)',
        opacity: 1,
        visibility: 'visible'
      })),
      state('hidden', style({
        transform: 'translateY(-200px)',
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('shown <=> hidden', animate(300)),
    ]),
  trigger('courseState2', [
	  state('shown', style({
	 	display: 'block'
	  })),
	  state('hidden', style({
		display: 'none'
	  })),
	  transition('shown => hidden', animate('0ms 200ms')),
	  transition('hidden => shown', animate('0ms ease')),
  	]),
  ]
})
export class TeacherComponent implements OnInit {
  teacher = {};
  groups;
  showEdit = false;
  students;
  studentList = [];
  courseState = 'hidden';

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
  	const teacherId = localStorage.getItem('userId');
  	const title = form.value.title;
  	const description = form.value.description;
  	const key = form.value.key;
  	const groupName = form.value.groupName;

  	const course = {title: title, description: description, key: key, teacherId: teacherId, groupName: groupName, students: this.studentList};
  	this.teacherService.createCourse(course).subscribe(result =>{ 
  		console.log(result);
  	});

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

  addStudent(student) {
  	console.log("sdfdsfds");
  	if (student.value !== '') {
  		let foundStudent = this.students.find((s) => {
  			if (s.fullName === student.value) {
  				return s;
  			}
  		});
  		let st = this.studentList.find((st) => {
  			if (st._id === foundStudent._id) {
  				return true;
  			}
  		});

  		if (!st) {
  			this.studentList.push(foundStudent);
  		}
  		
  	}
  	
  }

  clearStudents(student) {
  	this.studentList = [];
  }

  showCourseForm() {
  	this.courseState = this.courseState === 'shown' ?  'hidden' : 'shown';
  }

  showEditPage() {
	this.showEdit = true;
  }

  getEditVal(val) {
  	this.showEdit = val;
  }

}

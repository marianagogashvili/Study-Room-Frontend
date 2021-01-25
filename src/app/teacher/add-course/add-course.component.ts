import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { AuthService } from '../../auth/auth.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  @Output() getCourse: EventEmitter<any> = new EventEmitter<any>();
  groups;
  students;
  studentList = [];

  checkIcon = faCheckCircle;
  crossIcon = faTimesCircle;


  constructor(private teacherService: TeacherService,
  			  private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  	this.authService.getGroups().subscribe(groups => {
      this.groups = groups;
      console.log(groups);
    });
  }

  findStudent(name: string) {
  		if (name.length > 2) {
  			this.teacherService.findStudent({name: name}).subscribe(students => {
		  		console.log(students);
		  		this.students = students;
		  	});
  		} 
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

  removeStudent(index) {
  	this.studentList.splice(index, 1);
  }

  onSubmitCourse(form: NgForm) {
  	const teacherId = localStorage.getItem('userId');
  	const title = form.value.title;
  	const description = form.value.description;
  	const key = form.value.key;
  	const groupName = form.value.groupName;

  	const course = {title: title, description: description, key: key, teacherId: teacherId, groupName: groupName, students: this.studentList};
  	this.teacherService.createCourse(course).subscribe(result =>{ 
  		this.getCourse.emit(course);
  	}, error => {
  		this.teacherService.sendError(error);
  		this.router.navigate(['/']);
  	});

  }

}

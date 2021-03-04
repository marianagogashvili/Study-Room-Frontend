import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { HomeService } from '../../home.service';

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
  fields;
  students;
  studentList = [];

  checkIcon = faCheckCircle;
  crossIcon = faTimesCircle;


  constructor(private teacherService: TeacherService,
          private homeService: HomeService,
  			  private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  	this.homeService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
    this.homeService.getFields().subscribe(fields => {
      this.fields = fields;
    });
  }

  findStudent(name: string) {
  		if (name.length > 2) {
  			this.teacherService.findStudent({name: name}).subscribe((students: any) => {
          if (students.length > 0) {
            this.students = students;
          }
		  	});
  		} 
  }

  addStudent(student) { 	
  	if (student.value !== '') {
      student = student.value.split('-');
  		let foundStudent = this.students.find((s) =>s.fullName === student[0].trim() || s.login === student[1].trim());

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
  	const title = form.value.title;
  	const description = form.value.description;
  	const key = form.value.key;
    const opened = form.value.opened || false;
  	const groupName = form.value.groupName;
    const fieldName = form.value.fieldName;


  	const course = {title: title, description: description, key: key, opened: opened, groupName: groupName, fieldName: fieldName, students: this.studentList};
  	this.teacherService.createCourse(course).subscribe(result =>{ 
  		this.getCourse.emit(course);
  	}, error => {
  		this.teacherService.sendError(error);
  		this.router.navigate(['/']);
  	});

  }

}

import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student = {};

  showEdit = false;
  constructor(private studentService: StudentService,
  			  private router: Router,
  			  private datePipe: DatePipe) { }

  ngOnInit() {
  	this.studentService.student.subscribe(result => {
  		if (result !== null) {
  			this.student = result;
  		}
  		console.log(this.student);
  	});

  	const id = localStorage.getItem('userId');
  	this.studentService.getStudent({id: id}).subscribe(student => {
  		this.student = student;
  		console.log(this.student);
  	}, error => {
  		this.studentService.sendError(error);
  		this.router.navigate(['/']);
  	});
  }

  showEditPage() {
	this.showEdit = true;
  }

  getEditVal(val) {
  	this.showEdit = val;
  }

}

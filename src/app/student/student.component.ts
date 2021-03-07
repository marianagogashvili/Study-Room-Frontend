import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student = {};
  loading;

  showEdit = false;
  constructor(private studentService: StudentService,
  			  private router: Router,
  			  private datePipe: DatePipe) { }

  ngOnInit() {
  	this.loading = true;
  	this.studentService.student.subscribe(result => {
  		if (result !== null) {
  			this.student = result;
  			this.loading = false;
  		}
  	});

  	this.studentService.getStudent().subscribe(student => {
  		console.log(student);
  		this.student = student;
  		this.loading = false;
  	}, error => {
  		this.studentService.sendError(error);
  		this.router.navigate(['/']);
  	});
  }

  goToCourse(id) {
  	this.router.navigate(['/course/',  id]);
  }

  showEditPage() {
	this.showEdit = true;
  }

  getEditVal(val) {
  	this.showEdit = val;
  }

}

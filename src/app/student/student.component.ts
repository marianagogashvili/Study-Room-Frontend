import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student = {};
  constructor(private studentService: StudentService,
  			  private router: Router) { }

  ngOnInit() {
  	const id = localStorage.getItem('userId');
  	this.studentService.getStudent({id: id}).subscribe(student => {
  		this.student = student;
  		console.log(this.student);
  	}, error => {
  		this.studentService.sendError(error);
  		this.router.navigate(['/']);
  	});
  }

}

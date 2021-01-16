import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacher = {};
  constructor(private teacherService: TeacherService,
  			  private router: Router) { }

  ngOnInit() {
  	const id = localStorage.getItem('userId');
  	this.teacherService.getTeacher({id: id}).subscribe(teacher => {
  		this.teacher = teacher;
  		console.log(this.teacher);
  	}, error => {
  		this.teacherService.sendError(error);
  		this.router.navigate(['/']);
  	});
  }

}

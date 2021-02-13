import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  courses;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
  	this.studentService.getGrades().subscribe(grades => {
  		this.courses = grades;
  		console.log(grades);
  	});
  }

}

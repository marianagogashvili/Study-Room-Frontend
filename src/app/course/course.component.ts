import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  loading;
  course;
  constructor(private route: ActivatedRoute,
  			  private courseService: CoursesService) { }

  ngOnInit() {
  	this.loading = true;
  	this.route.params.subscribe(result => {
  		this.courseService.getCourse({id: result['id']}).subscribe(result => {
  			this.course = result;
  			this.loading = false;
  			console.log(result);
  		});
  	});
  }

}

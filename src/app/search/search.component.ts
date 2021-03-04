import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../course/courses.service';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  courses;
  defaultCourses;
  selectedCourse;

  fields;
  constructor(private courseService: CoursesService,
  			  private homeService: HomeService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.homeService.getFields().subscribe(fields => {
  		this.fields = fields;
  	});

  	this.route.queryParams.subscribe(params => {
  		this.courseService.searchCourses({title: params['title']}).subscribe(courses => {
  			this.courses = courses;
  			this.defaultCourses = courses;

  			console.log(this.courses);

  		});
  	});
  }
  showCourse(course) {
  	this.selectedCourse = course;
  }

  registerInCourse() {
  }

  sortByField(fieldName) {
  	console.log(fieldName);
  	this.courses = this.defaultCourses.filter(course => course.field.name === fieldName);
  }

}

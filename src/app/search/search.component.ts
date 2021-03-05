import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../course/courses.service';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  courses;
  defaultCourses;
  selectedCourse;

  userType;
  userId;

  fields;

  sub: Subscription;

  constructor(private courseService: CoursesService,
  			  private homeService: HomeService,
  			  private route: ActivatedRoute,
  			  private router: Router) { }

  ngOnInit() {
  	this.sub = this.courseService.userType.subscribe(userType => {
  		this.userType = userType.type;
  		this.userId = userType.uid;
   	});

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

  register(key) {
  	if ((this.selectedCourse.key !== '' && this.selectedCourse.key === key) || 
  		 this.selectedCourse.key === '') {
  		this.courseService.registerStudent({courseId: this.selectedCourse._id}).subscribe(result => {
  			console.log(result);
  			this.router.navigate(['/course', this.selectedCourse._id]);
  		});
  	} else {

  	}
  }

  sendRequest(key) {
  	console.log(key);
  	if ((this.selectedCourse.key !== '' && this.selectedCourse.key === key) || 
  		 this.selectedCourse.key === '') {
  		this.courseService.sendStudentRequest({courseId: this.selectedCourse._id}).subscribe(result => {
  			console.log(result);
  			this.selectedCourse.requests.push(this.userId);
  			this.selectedCourse = null;
  		});
  	}
  }

  sortByField(fieldName) {
  	console.log(fieldName);
  	this.courses = this.defaultCourses.filter(course => course.field.name === fieldName);
  }

}

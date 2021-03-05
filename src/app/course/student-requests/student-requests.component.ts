import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-student-requests',
  templateUrl: './student-requests.component.html',
  styleUrls: ['./student-requests.component.css']
})
export class StudentRequestsComponent implements OnInit {
  requests;

  constructor(private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.parent.params.subscribe(params => {
  		this.courseService.getCourse({id: params['id']}).subscribe((course: {requests}) => {
  			console.log(course);
  			this.requests = course.requests;
  		});
  	});
  	
  }

}

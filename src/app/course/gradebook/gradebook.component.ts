import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.css']
})
export class GradebookComponent implements OnInit {
  grades;
  upIcon = faAngleUp;
  downIcon = faAngleDown;
  
  constructor(private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.parent.params.subscribe(params => {
  		this.courseService.getGrades({id: params['id']}).subscribe(grades => {
  			this.grades = grades;
  		});
  	});
  	
  }

}

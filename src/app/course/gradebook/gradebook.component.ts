import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { CoursesService } from '../courses.service';
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

  dateSort;
  deadlineSort;
  gradeSort;
  maxSort;

  gradeSum = 0;
  maxGradeSum = 0;
  percentGrade;

  constructor(private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.parent.params.subscribe(params => {
  		this.courseService.getGrades({id: params['id']}).subscribe(grades => {
  			this.grades = grades;
  			this.grades.forEach(value => {
	  			if (value.grade) {
	  				this.gradeSum += value.grade;
	  			}
	  			if (value.maxGrade) {
	  				this.maxGradeSum += value.maxGrade;
	  			}
	  		});
	  		this.percentGrade = Math.round(this.gradeSum * 100/this.maxGradeSum);
  		});
  		
  	});
  	
  }

  orderByAssignmentDate(type) {
  	// down - descr
  	// up - asc
  	this.dateSort = type;
  	this.grades.sort((a, b): any => {
  		if (type === 'asc') {
  			return (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any);
  		} else if (type === 'desc'){
  			return (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any);
  		}
  		
  	});
  	console.log(this.grades);
  }

  orderByDeadline(type) {
  	this.deadlineSort = type;
  	this.grades.sort((a, b): any => {
  		if (type === 'asc') {
  			return (new Date(b.deadline) as any) - (new Date(a.deadline) as any);
  		} else if (type === 'desc'){
  			return (new Date(a.deadline) as any) - (new Date(b.deadline) as any);
  		}
  	});
  }

  orderByGrade(type) {
  	this.gradeSort = type;
  	this.grades.sort((a, b): any => {
  		if (type === 'asc') {
  			return b.grade - a.grade;
  		} else if (type === 'desc'){
  			return a.grade - b.grade;
  		}
  	});
  }

  orderByMax(type) {
  	this.maxSort = type;
  	this.grades.sort((a, b): any => {
  		if (type === 'asc') {
  			return b.maxGrade - a.maxGrade;
  		} else if (type === 'desc'){
  			return a.maxGrade - b.maxGrade;
  		}
  	});
  }

}

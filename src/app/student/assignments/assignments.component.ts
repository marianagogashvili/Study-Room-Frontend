import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import { StudentService } from '../student.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit { 
  works;
  courses;
  defaultworks;

  crossIcon = faTimesCircle;
  checkIcon = faCheckCircle;

  sortForm: FormGroup;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  	this.sortForm = new FormGroup({
  		'done': new FormControl('-'),
  		'deadline': new FormControl('-'),
		'grades': new FormControl('-'),
		'course': new FormControl('-')
  	});
  	this.studentService.getAssignments().subscribe((result: {works, courses}) => {
  		console.log(result);
  		this.works = result.works;
  		this.courses = result.courses;

  		this.defaultworks = result.works;
  	});
  }

  sort(sortBy) {
  	console.log(this.sortForm.value);

  	const formVal = this.sortForm.value;
  	if (formVal.done !== '-') {
  		this.works = this.defaultworks.filter(val => {
  			if (formVal.done === 'true') {
  				return val.solution;
  			} else if (formVal.done === 'false') {
  				return !val.solution;
  			}
  		});
  	} else {
  		this.works = this.defaultworks;
  	}
  	if (sortBy === 'course') {
  		if (formVal.course !== '-') {
  			this.works = this.defaultworks.filter(val => val.courseId === formVal.course);
  		} else {
  			this.works = this.defaultworks;
  		}
  	}
  	if (sortBy === 'deadline') {
  		this.sortForm.patchValue({'grades': '-'});
  		if (formVal.deadline !== '-') {
	  		this.works = this.works.sort((a, b): any => {
	  			if (formVal.deadline === 'desc') {
	  			  	return ((new Date(b.work.deadline) as any) - (new Date(a.work.deadline) as any));
	  			} else if (formVal.deadline === 'asc'){
	  				console.log(a.work.deadline);
	  				return ((new Date(a.work.deadline) as any) - (new Date(b.work.deadline) as any) ) ;
	  			}
	  		});
	  	}
  	}
  	if (sortBy === 'grades') {
  		this.sortForm.patchValue({'deadline': '-'});
  		if (formVal.grades !== '-') {
	  		this.works = this.works.sort((a, b): any => {
	  			if (formVal.grades === 'asc') {
	  			  	return ((b.solution && b.solution.grade) ? 
	  			  	  		(b.solution.grade * 100 /  b.work.maxGrade) : 0 )- 
	  			  		((a.solution && a.solution.grade) ? 
	  			  		    (a.solution.grade * 100 /  a.work.maxGrade)  : 0);
	  			} else if (formVal.grades === 'desc'){
	  				console.log("????");
	  			  	return ((a.solution && a.solution.grade) ? 
	  			  	  		(a.solution.grade * 100 /  a.work.maxGrade) : 0) - 
	  			  		((b.solution && b.solution.grade) ? 
	  			  		 (b.solution.grade * 100 /  b.work.maxGrade) : 0);
	  			}
	  		});
  		}
  	}
  

  }



}

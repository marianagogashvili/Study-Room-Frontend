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
  assignments;
  courses;
  defaultAssignments;

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
  	this.studentService.getAssignments().subscribe((result: {assignments, courses}) => {
  		console.log(result);
  		this.assignments = result.assignments;
  		this.courses = result.courses;

  		this.defaultAssignments = result.assignments;
  	});
  }

  sort(sortBy) {
  	console.log(this.sortForm.value);

  	const formVal = this.sortForm.value;
  	if (formVal.done !== '-') {
  		this.assignments = this.defaultAssignments.filter(val => {
  			if (formVal.done === 'true') {
  				return val.solution;
  			} else if (formVal.done === 'false') {
  				return !val.solution;
  			}
  		});
  	} else {
  		this.assignments = this.defaultAssignments;
  	}
  	if (sortBy === 'course') {
  		if (formVal.course !== '-') {
  			this.assignments = this.defaultAssignments.filter(val => val.courseId === formVal.course);
  		} else {
  			this.assignments = this.defaultAssignments;
  		}
  	}
  	if (sortBy === 'deadline') {
  		this.sortForm.patchValue({'grades': '-'});
  		if (formVal.deadline !== '-') {
	  		this.assignments = this.assignments.sort((a, b): any => {
	  			if (formVal.deadline === 'desc') {
	  			  	return ((new Date(b.assignment.deadline) as any) - (new Date(a.assignment.deadline) as any));
	  			} else if (formVal.deadline === 'asc'){
	  				console.log(a.assignment.deadline);
	  				return ((a.assignment.deadline !== null ? (new Date(a.assignment.deadline) as any) : (new Date() as any)) - (b.assignment.deadline !== null ? (new Date(b.assignment.deadline) as any) : (new Date() as any))) ;
	  			}
	  		});
	  	}
  	}
  	if (sortBy === 'grades') {
  		this.sortForm.patchValue({'deadline': '-'});
  		if (formVal.grades !== '-') {
	  		this.assignments = this.assignments.sort((a, b): any => {
	  			if (formVal.grades === 'asc') {
	  			  	return ((b.solution && b.solution.grade) ? 
	  			  	  		(b.solution.grade * 100 /  b.assignment.maxGrade) : 0 )- 
	  			  		((a.solution && a.solution.grade) ? 
	  			  		    (a.solution.grade * 100 /  a.assignment.maxGrade)  : 0);
	  			} else if (formVal.grades === 'desc'){
	  				console.log("????");
	  			  	return ((a.solution && a.solution.grade) ? 
	  			  	  		(a.solution.grade * 100 /  a.assignment.maxGrade) : 0) - 
	  			  		((b.solution && b.solution.grade) ? 
	  			  		 (b.solution.grade * 100 /  b.assignment.maxGrade) : 0);
	  			}
	  		});
  		}
  	}
  

  }



}

import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router,NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { TestService } from '../test.service';
import { CoursesService } from '../courses.service';


@Component({
  selector: 'app-test-answers',
  templateUrl: './test-answers.component.html',
  styleUrls: ['./test-answers.component.css']
})
export class TestAnswersComponent implements OnInit {
  students;
  defaultStudents;

  groups;
  searchForm: FormGroup;

  minusIcon = faMinus;
  checkIcon = faCheck;
  redoIcon = faRedo;
  upIcon = faAngleUp;
  downIcon = faAngleDown;

  gradeSort;
  passedSort;

  constructor(private testworkService: TestService,
  			  private router: Router,
  			  private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.searchForm = new FormGroup({
  		'fullName': new FormControl(),
  		'login': new FormControl(),
  		'group': new FormControl(''),
  	});


  	this.courseService.getGroups().subscribe(groups => {
  		this.groups = groups;
  	});

  	this.route.queryParams.subscribe(params => {
  		this.testworkService.getAnswersForTeacher({testId: params['testworkId']})
  			.subscribe(result => {
  				this.students = result;
  				this.defaultStudents = result;
  				console.log(this.students);
  			});
  	});
  	
  }

  orderByGrade(type) {
  	this.gradeSort = type;
  	this.students.sort((a, b): any => {
  		if (type === 'asc') {
  			return b.sumPoints - a.sumPoints;
  		} else if (type === 'desc'){
  			return a.sumPoints - b.sumPoints;
  		}
  	});
  }

  orderByPassed(type) {
  	this.passedSort = type;
  	this.students.sort((a, b): any => {
  		if (type === 'asc') {
  			return b.answers.length - a.answers.length;
  		} else if (type === 'desc'){
  			return a.answers.length - b.answers.length;
  		}
  	});
  }

  clearSearch() {
  	this.searchForm.patchValue({'fullName': '', 'login': '', 'group': ''});
  	this.students = this.defaultStudents;
  } 

  findStudents() {
  	const name = this.searchForm.value.fullName;
  	const login = this.searchForm.value.login;
  	const group = this.searchForm.value.group;


    this.students = this.defaultStudents.filter(student => (name ? student.fullName.toLowerCase().includes(name.toLowerCase()) : true) &&
  			(group ? student.group === group : true)
  	);

  }

}

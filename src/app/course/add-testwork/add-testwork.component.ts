import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../topic.service';
import { TestService } from '../test.service';
import { map, mergeMap } from 'rxjs/operators';
import { pipe, Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-testwork',
  templateUrl: './add-testwork.component.html',
  styleUrls: ['./add-testwork.component.css']
})
export class AddTestworkComponent implements OnInit {
  courseId;
  topicId;
  createForm;

  constructor(private route: ActivatedRoute,
  			  private topicService: TopicService,
  			  private testworkService: TestService,
  			  private router: Router) { }

  ngOnInit() {
  	this.createForm = new FormGroup({
  		'title': new FormControl('', Validators.required),
  		'hidden': new FormControl(false, Validators.required),
  		'deadline': new FormControl('', Validators.required),
  		'hours': new FormControl(0, Validators.required),
  		'minutes': new FormControl(0, Validators.required),
  		'testQuestions': new FormArray([])
  	});

  	this.route.parent.params.subscribe(params => {
  		this.courseId = params['id'];
  		console.log(params);
  	});

  	this.route.queryParams.subscribe(queryParams => {
  		this.topicId = queryParams['topicId'];
  	});
  }

  onAddTestQuestion() {
  	const group = new FormGroup({
  		'title': new FormControl('', Validators.required),
  		'a': new FormControl('', Validators.required),
  		'b': new FormControl('', Validators.required),
  		'c': new FormControl('', Validators.required),
  		'd': new FormControl('', Validators.required),
  		'answer': new FormControl('', Validators.required)
  	});
  	(<FormArray>this.createForm.get('testQuestions')).push(group);
  	document.getElementById('create__btn').scrollIntoView({ behavior: 'smooth' });
  }

  onAddQuestion() {
  	const group = new FormGroup({
  		'title': new FormControl('', Validators.required),
  		'answer': new FormControl('', Validators.required)
  	});
  	(<FormArray>this.createForm.get('testQuestions')).push(group);
  	document.getElementById('create__btn').scrollIntoView({ behavior: 'smooth' });
 	console.log(this.createForm);
  }

  createTestwork() {
  	const testQuestions = this.createForm.value.testQuestions;
  	if (testQuestions !== []) {
  		const title = this.createForm.value.title;
	  	const deadline = this.createForm.value.deadline;
	  	const hidden = this.createForm.value.hidden;
	  	const timeRestriction = this.createForm.value.hours * 3600 + this.createForm.value.minutes * 60;
	  	console.log(this.createForm.value.testQuestions);

	  	this.testworkService.createTestwork({
	  		courseId: this.courseId,
	  		title: title, 
	  		deadline: deadline, 
	  		hidden: hidden,
	  		timeRestriction: timeRestriction,
	  		topicId: this.topicId,
	  		questions: testQuestions}).subscribe(result => {
	  			this.router.navigate(['/course/', this.courseId]);
	  	});
  	} else {
  		//show error
  	}
  }

}

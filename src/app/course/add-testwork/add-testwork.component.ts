import { Component, OnInit, OnDestroy } from '@angular/core';
import { TopicService } from '../topic.service';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-testwork',
  templateUrl: './add-testwork.component.html',
  styleUrls: ['./add-testwork.component.css']
})
export class AddTestworkComponent implements OnInit, OnDestroy {
  createForm;
  sub;
  constructor(private topicService: TopicService) { }

  ngOnInit() {
  	this.createForm = new FormGroup({
  		'title': new FormControl('', Validators.required),
  		// 'hidden': new FormControl('', Validators.required),
  		'deadline': new FormControl('', Validators.required),
  		// 'timeRestriction': new FormControl('', Validators.required),
  		'testQuestions': new FormArray([]),
  		'regularQuestions': new FormArray([])
  	});

  	this.sub = this.topicService.topicId.subscribe(topicId => {
  		console.log(topicId);
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
  	console.log(this.createForm);
  }

  onAddQuestion() {
  	const group = new FormGroup({
  		'title': new FormControl('', Validators.required),
  		'answer': new FormControl('', Validators.required)
  	});
  	(<FormArray>this.createForm.get('regularQuestions')).push(group);
  	
  }

  createTestwork() {
  	console.log(this.createForm);
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  }

}

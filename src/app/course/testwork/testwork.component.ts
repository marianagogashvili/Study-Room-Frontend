import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-testwork',
  templateUrl: './testwork.component.html',
  styleUrls: ['./testwork.component.css']
})
export class TestworkComponent implements OnInit {
  testwork;
  timeRestriction;
  loading;

  workMode = false;
  currentQuestionId;

  answers: {question: string, answer: string}[] = []; // {question_id: , answer: 'b'}

  constructor(private testworkService: TestService,
  			  private route: ActivatedRoute,
  			  private router: Router) { }

  ngOnInit() {
  	this.loading = true;
  	this.route.queryParams.subscribe(params => {
  		this.testworkService
  		.getTestwork({testId: params['testId']}).subscribe(testwork => {
  			console.log(testwork);
  			this.testwork = testwork;
  			this.currentQuestionId = 0;
  			this.timeRestriction = Math.floor(this.testwork.timeRestriction / 3600) + " hrs and " + Math.floor(this.testwork.timeRestriction % 3600 / 60) + " minutes";
  			this.loading = false;
  		});
  	});
  	
  }

  addAnswer(answer) {
  	// console.log(this.answers !== []);
  	let currentQuestion = this.testwork.questions[this.currentQuestionId];
  	if (this.answers.length !== 0) {
  		let answ: any  = this.answers.filter(a => a.question === currentQuestion._id);
	  	if (answ) {
	  		answ[0].answer = answer;
	  	} else {
	  		this.answers.push({question: currentQuestion._id, answer: answer});
	  	}
  	} else {
  		this.answers.push({question: currentQuestion._id, answer: answer});
  	}
  	
  	console.log(this.answers);
  }

  startTheTest() {
  	this.workMode = true;
  	//start the timer
  }

}

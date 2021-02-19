import { Component, OnInit, HostListener } from '@angular/core';
import { Router,NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { TestService } from '../test.service';
import { filter } from 'rxjs/operators'

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

  answerForm: FormGroup;
  subscription;

  answers = []; // {question_id: , answer: 'b'}

  constructor(private testworkService: TestService,
  			  private route: ActivatedRoute,
  			  private cookieService: CookieService,
  			  private router: Router) { }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.answerForm.value.answer.trim() !== '') {
      	this.answers[this.currentQuestionId] = this.answerForm.value.answer;
    }  
    this.cookieService.set('Answers', JSON.stringify(this.answers));
  }

  ngOnInit() {
  	// this.router.events
  	// .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
   //  .subscribe(event => {
   //    if (
   //      event.id === 1 &&
   //      event.url === event.urlAfterRedirects 
   //    ) {
   //    	this.cookieService.set('Answers', 'fuck' );
   //    	let cookieValue = this.cookieService.get('Answers');
   //    	console.log(cookieValue);
   //    }
   //  })
	let cookieAnswers = this.cookieService.get('Answers');
	if (cookieAnswers) {
		this.answers = JSON.parse(cookieAnswers);
	}
	

   	this.subscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
            this.cookieService.set('Answers', 'fuck' );
      		let cookieValue = this.cookieService.get('Answers');
      		console.log(cookieValue);
        }
    });

  	this.answerForm = new FormGroup({
  		'answer': new FormControl('', Validators.required)
  	});

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
  	let cookieValue = this.cookieService.get('Answers');
    console.log(cookieValue);
  }

  addAnswer(answer) {
  	// console.log(this.answers !== []);
  	// let currentQuestion = this.testwork.questions[this.currentQuestionId];
  	// if (this.answers.length !== 0) {
  	// 	let answ: any  = this.answers.filter(a => a.question === currentQuestion._id);
	  // 	if (answ) {
	  // 		answ[0].answer = answer;
	  // 	} else {
	  // 		this.answers.push({question: currentQuestion._id, answer: answer});
	  // 	}
  	// } else {
  	// 	this.answers.push({question: currentQuestion._id, answer: answer});
  	// }

  	this.answers[this.currentQuestionId] = answer;
  	
  	console.log(this.answers);
  }

  saveAnswer() {
  	this.answers[this.currentQuestionId] = this.answerForm.value.answer;
  	this.currentQuestionId += 1;
  	this.answerForm.patchValue({'answer': this.answers[this.currentQuestionId] || ''});

  	console.log(this.answers);
  }

  saveTest() {
  	this.testworkService
  	.saveAnswers({answers: this.answers, testId: this.testwork._id}).subscribe(result => {

  	});
  }

  startTheTest() {
  	this.workMode = true;
  	//start the timer
  }

  goToQuestion(i) {
  	this.currentQuestionId = i;
  	this.answerForm.patchValue({'answer': this.answers[i]});
  }

}

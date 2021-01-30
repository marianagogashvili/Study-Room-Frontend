import { Component, OnInit, OnDestroy} from '@angular/core';
import { TopicService } from '../topic.service';
import { CoursesService } from '../courses.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  topicForm: FormGroup;
  topics;
  scrollEl = null;

  upIcon = faArrowCircleUp;
  downIcon = faArrowCircleDown;
  removeIcon = faTimesCircle;

  newTopicMode = false;

  sub: Subscription;

  constructor(private topicService: TopicService,
  			  private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.topicForm = new FormGroup({
  		'title': new FormControl('', [Validators.required]),
  		'hidden': new FormControl(''),
  	});

  	this.sub = this.topicService.oldTopics.subscribe(topics => {
  		this.topics = topics;
  	});

  	this.route.parent.params.subscribe(params => {
		this.topicService.getTopics(
	  		{courseId: params['id']})
	  		.subscribe(topics => {
	  			console.log(topics);
	  			this.topics = topics;
	  			this.topicService.sendTopics(topics);
	  	});
  	});
  	
  }
  ngAfterViewChecked() {
  	if (this.scrollEl !== null) {
  		document.getElementById(this.scrollEl).scrollIntoView({ behavior: 'smooth' });
  		this.scrollEl = null;
  	} 
  }

  createTopic() {
  	const title = this.topicForm.value.title;
  	const hidden = this.topicForm.value.hidden || false;
  	const topic = { 
  			title: title, 
  			hidden: hidden, 
  			courseId: this.courseService.courseId 
  		};
  	this.topicService.createTopic(topic)
  		.subscribe(result => {
  			this.topicForm.controls['title'].setValue('')
  			this.topicForm.controls['title'].setErrors(null);
  			this.topicService.sendTopics([...this.topics, result]);
  			let id = ("topic" + (this.topics.length-1));
  			this.scrollEl = id;
  		});
  }

  editTopic(topicId) {

  }

  removeTopic(topicId, index) {
  	this.topicService.deleteTopic({id: topicId}).subscribe(result => {
  		this.topics.splice(index, 1);
  	});
  }

  topicMode() {
  	this.newTopicMode = !this.newTopicMode;
  }

  goUp() {
  	this.scrollEl = 'courseTitle';
  }

  goDown() {
  	let id = ("topic" + (this.topics.length-1));
  	this.scrollEl = id;
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  }
}

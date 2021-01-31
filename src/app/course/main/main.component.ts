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
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  topicForm: FormGroup;
  editForm: FormGroup;

  topics;
  scrollEl = null;

  upIcon = faArrowCircleUp;
  downIcon = faArrowCircleDown;
  removeIcon = faTimesCircle;
  editIcon = faEdit;

  newTopicMode = false;
  editIndex = null;
  beforeTopicNum = null;

  sub: Subscription;

  constructor(private topicService: TopicService,
  			  private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.topicForm = new FormGroup({
  		'title': new FormControl('', [Validators.required]),
  		'hidden': new FormControl(''),
  	});

  	this.editForm = new FormGroup({
  		'title': new FormControl('', [Validators.required]),
  		'hidden': new FormControl(''),
  	});

  	this.sub = this.topicService.oldTopics
  		.subscribe(topics => {
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
  			courseId: this.courseService.courseId,
  			beforeTopic: this.beforeTopicNum 
  		};
  	this.topicService.createTopic(topic)
  		.subscribe(result => {
  			this.newTopicMode = false;
  			this.topicForm.controls['title'].setValue(' ');
  			if (!this.beforeTopicNum) {
	  			this.topics = [...this.topics, result];
	  			let id = ("topic" + (this.topics.length-1));
	  			this.scrollEl = id;
  			} else {
  				this.topics.splice((this.beforeTopicNum-1), 0, result);
	  			this.scrollEl = "topic" + (this.beforeTopicNum-1);
	  			this.beforeTopicNum = null;
  			}
  			
  		});
  }


  editTopic(id) {
  	const topicId = id;
  	const title = this.editForm.value.title;
  	const hidden = this.editForm.value.hidden;
	console.log(this.editForm.value);
  	this.topicService
  		.editTopic({id: topicId, title: title, hidden: hidden})
  		.subscribe(topic => {
  			this.topics[this.editIndex] = topic;
  			this.editIndex = null;
  		});
  }

  addBefore(topic) {
  	this.newTopicMode = true;
  	this.beforeTopicNum = topic.num;
  	console.log(this.beforeTopicNum);
  }

  removeTopic(topicId, index) {
  	this.topicService.deleteTopic({id: topicId}).subscribe(result => {
  		this.topics.splice(index, 1);
  		this.topics.filter(topic => {
  			if (topic.num > index) {
  				topic.num -= 1;
  			}
  		});
  	});
  }



  showEditTopic(topic, i) {
  	this.editIndex = i;
  	this.editForm.patchValue({title: topic.title, hidden: topic.hidden});
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

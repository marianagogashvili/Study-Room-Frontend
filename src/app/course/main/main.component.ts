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
import { faFile } from '@fortawesome/free-regular-svg-icons';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { map, mergeMap } from 'rxjs/operators';
import { AssignmentService } from '../assignment.service';
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
  fileIcon = faFile;

  newTopicMode = false;
  editIndex = null;
  beforeTopicNum = null;
  assignments;

  sub: Subscription;
  sub2: Subscription;

  constructor(private topicService: TopicService,
  			  private courseService: CoursesService,
  			  private route: ActivatedRoute,
  			  private assignmentService: AssignmentService) { }

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
  		this.sub2 = this.assignmentService.getAssignmentsByCourse(
	  		{courseId: params['id']})
  			.pipe(map(a => {
  				this.assignments = a;
  				return a;
  			}), mergeMap((assignment):any => {
  				return this.topicService.getTopics({courseId: params['id']})
  			}), mergeMap((topics: any[]) => {
				topics.forEach(topic => {
					topic.assignments = this.assignments.filter(as => as.topic === topic._id);
				});

				return [topics];
  			}), mergeMap((topics: any[])  => {

  				this.topics = topics;
	  			this.topicService.sendTopics(topics);

  				return this.courseService.newAssignment;
  			}), mergeMap((assignment): any => {
  				let sub = assignment;
  				let topic = this.topics.filter(t => t._id === assignment.topic);
				if (topic[0].assignments) {
					topic[0].assignments[topic[0].assignments.length] = assignment;
				} else {
					topic[0].assignments =[ assignment];			
				}
				
				return topic;
  			})).subscribe((topic:any)  => {

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
  			console.log(result);
  			// result.assignments = [];
  			this.newTopicMode = false;
  			this.topicForm.controls['title'].setValue(' ');
  			if (!this.beforeTopicNum) {
	  			this.topics = [...this.topics, result];
	  			if (this.topics.length >= 2) {
	  				this.scrollEl = ("topic" + (this.topics.length-2));
	  			}
  			} else {
  				this.topics.splice((this.beforeTopicNum-1), 0, result);
	  			if (this.beforeTopicNum >= 2) {
	  				this.scrollEl = "topic" + (this.beforeTopicNum-2);
	  			}
	  			this.beforeTopicNum = null;
  			}  			

  			
  		});
  }


  editTopic(id) {
  	const topicId = id;
  	const title = this.editForm.value.title;
  	const hidden = this.editForm.value.hidden;
	// console.log(this.editForm.value);
  	this.topicService
  		.editTopic({id: topicId, title: title, hidden: hidden})
  		.subscribe((topic: {title, hidden}) => {
  			this.topics[this.editIndex].title = topic.title;
  			this.topics[this.editIndex].hidden = topic.hidden;

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

  showAssignment(topic) {
  	this.courseService.showAssignment(topic);
  	document.getElementById('header').scrollIntoView({ behavior: 'smooth' });	
  }

  showEditTopic(topic, i) {
  	this.editIndex = i;
  	this.editForm.patchValue({title: topic.title, hidden: topic.hidden});
  }

  topicMode() {
  	this.newTopicMode = !this.newTopicMode;
  }

  goUp() {
  	this.scrollEl = 'header';
  }

  goDown() {
  	let id = ("topic" + (this.topics.length-1));
  	this.scrollEl = id;
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  	this.sub2.unsubscribe();
  }
}

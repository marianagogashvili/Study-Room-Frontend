import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { TopicService } from '../topic.service';
import { CoursesService } from '../courses.service';
import { AssignmentService } from '../assignment.service';
import { PostsService } from '../posts.service';

import { map, mergeMap } from 'rxjs/operators';
import { pipe, Subscription } from 'rxjs';

import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileWord } from '@fortawesome/free-regular-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

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

  pdfIcon = faFilePdf;
  wordIcon = faFileWord;
  fileIcon = faFile;
  linkIcon = faExternalLinkAlt;
  minusIcon = faMinusCircle;

  userType;

  newTopicMode = false;
  editIndex = null;
  beforeTopicNum = null;

  assignments;

  feed;

  sub: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(private topicService: TopicService,
  			  private courseService: CoursesService,
  			  private postService: PostsService,
  			  private route: ActivatedRoute,
  			  private assignmentService: AssignmentService) { }

  ngOnInit() {
  	this.sub3 = this.courseService.userType.subscribe(type => {
  		this.userType =  type;
  		console.log(this.userType);
  	});

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
  		this.sub2 = this.courseService.getFeed({courseId: params['id']})
  			.pipe(map(feed => {
  				console.log(feed);
  				this.feed = feed;
  				return feed;
  			}), mergeMap((feed):any => {
  				return this.topicService.getTopics({courseId: params['id']})
  			}), mergeMap((topics: any[]) => {
				topics.forEach(topic => {
					topic.feed = this.feed.filter(as => as.topic === topic._id);
				});

				return [topics];
  			}), mergeMap((topics: any[])  => {

  				this.topics = topics;
  				console.log(topics);
	  			this.topicService.sendTopics(topics);

  				return this.courseService.feedValue;
  			}), mergeMap((assignment): any => {
  				console.log(assignment);
  				let topic = this.topics.filter(t => t._id === assignment.topic);
				if (topic[0].feed) {
					topic[0].feed[topic[0].feed.length] = assignment;
				} else {
					topic[0].feed =[ assignment ];			
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
  	document.getElementById('header').scrollIntoView({behavior: 'smooth'});
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

  deletePost(index, postIndex, postId) {
  	this.topics[index].feed.splice(postIndex, 1);
  	this.postService.deletePost({id: postId}).subscribe(result =>{ 
  		
  	});
  }

  openLink(url, file) {
  	let fileUrl = url;
  	if (file) {
  		fileUrl =  "http://localhost:8000/" + url;
  	}
  	
  	window.open(fileUrl, '_blank');
  }

  showAssignment(topic) {
  	this.courseService.showAssignment(topic);
  	document.getElementById('header').scrollIntoView({ behavior: 'smooth' });	
  }

  showPost(topic) {
  	this.courseService.showPost(topic);
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
  	this.sub3.unsubscribe();
  }
}

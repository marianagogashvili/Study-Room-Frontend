import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AssignmentService } from '../assignment.service';
import { PostsService } from '../posts.service';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  animations: [
  trigger('errorState', [
      state('shown', style({
        transform: 'translateX(0px)',
        opacity: 1,
        visibility: 'visible'
      })),
      state('hidden', style({
        transform: 'translateY(-50px)',
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('shown <=> hidden', animate(300)),
    ])
  ]
})
export class AddPostComponent implements OnInit {
  @Input() topicId;
  @Input() courseId;
  error;
  file = null;
  errorState = 'hidden';

  constructor(private postService: PostsService,
  			  private courseService: CoursesService) { }

  ngOnInit() {
  }

  saveFile(event) {
  	let fileList: FileList = event.target.files;
  	let file = fileList[0];
  	if (file.size / 1000000 > 10) {
  		this.error = "File is too big";
  		this.errorState = 'shown';

  		setTimeout(() => {
  			this.errorState = 'hidden';
  		}, 2000);
  	} else {
  		this.file = file;
  		console.log(this.file);
  	}
  }

  removeFile(event) {
  	this.file = null;
  }

  createPost(form: NgForm) {
  	const title = form.value.title;
  	const link = form.value.link;

  	let formData: FormData = new FormData();
  	formData.append('dest', 'post');
  	if (this.file) {
  		formData.append('file', this.file, this.file.name);
  	}
  	formData.append('title', title);
  	formData.append('link', link);
  	formData.append('topicId', this.topicId);
  	formData.append('courseId', this.courseId);

  	this.postService.createPost(formData).subscribe(post =>{ 
  		console.log(post);

  		this.courseService.showPost(null);
		// this.courseService.sendNewPost(post);
		this.courseService.sendNewFeedPost(post);
	}, err => {
		this.courseService.showPost(null);
	});
  }

}

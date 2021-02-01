import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AssignmentService } from '../assignment.service';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
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
export class AddAssignmentComponent implements OnInit, OnDestroy {
  @Input() topicId;
  fileIcon = faFile;
  errorState = 'hidden';
  availableFrom = new Date().toISOString().slice(0, 16);

  file;
  fileName = null;

  error;
  constructor(private assignmentService: AssignmentService,
  		      private courseService: CoursesService,
  		      private router: Router) { }

  ngOnInit() {
  	console.log(this.topicId);
  }

  saveFile(event) {
  	let files: FileList = event.target.files;
  	this.file = files[0];
  	this.fileName = this.file.name;
  	if (this.file.size / 1000000 > 10) {
  		this.error = "File is too big";
  		this.errorState = 'shown';
  		setTimeout(() => {
  			this.errorState = 'hidden';
  		}, 2000);
  		this.fileName = null;
  	}
  	console.log(this.file);
  }

  createAssignment(form: NgForm){ 
  	if (this.fileName === null) {
  		this.error = "Please choose a file";
  		this.errorState = 'shown';
  		setTimeout(() => {
  			this.errorState = 'hidden';
  		}, 2000);
  	} else {
  		const title = form.value.title;
  		const descr = form.value.description;
  		const availableFrom = form.value.availableFrom;
  		const deadline = form.value.deadline;

  		if (deadline !== '' && deadline < availableFrom) {
  			this.error = "Please choose correct deadline";
	  		this.errorState = 'shown';
	  		setTimeout(() => {
	  			this.errorState = 'hidden';
	  		}, 2000);
  		} else {
  			let formData: FormData = new FormData();
	  		formData.append('file', this.file, this.fileName);
	  		formData.append('title', title);
	  		formData.append('description', descr);
	  		formData.append('availableFrom', availableFrom);
	  		formData.append('deadline', deadline);
	  		formData.append('courseId', this.courseService.courseId);
	  		formData.append('topicId', this.topicId);

	  		console.log(formData);
	  		this.assignmentService.createAssignment(
	  			formData)
	  			.subscribe(result => {
	  				this.courseService.showAssignment(null);
	  				this.courseService.sendNewAssignment(result);
	  				// this.router.navigate(['/course/' + this.courseService.courseId + '/main']);
	  			});
	  		}
  	}
  }

  ngOnDestroy() {
  	this.topicId = null;
  }
}

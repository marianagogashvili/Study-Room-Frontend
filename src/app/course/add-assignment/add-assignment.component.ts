import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AssignmentService } from '../assignment.service';
import { CoursesService } from '../courses.service';

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
export class AddAssignmentComponent implements OnInit {
  fileIcon = faFile;
  errorState = 'hidden';

  fileName = null;

  error;
  constructor(private assignmentService: AssignmentService,
  		      private courseService: CoursesService) { }

  ngOnInit() {
  }

  saveFile(event) {
  	let files: FileList = event.target.files;
  	let file = files[0];
  	this.fileName = file.name;
  	if (file.size / 1000000 > 10) {
  		this.error = "File is too big";
  		this.errorState = 'shown';
  		setTimeout(() => {
  			this.errorState = 'hidden';
  		}, 2000);
  		this.fileName = null;
  	}
  	console.log(file);
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

  		const assignment = {
  				title: title,
  				description: descr,
  				availableFrom: availableFrom,
  				deadline: deadline,
  				courseId: this.courseService.courseId
  			};
  		console.log(assignment);
  		// this.assignmentService.createAssignment(
  		// 	assignment)
  		// 	.subscribe(result => {

  		// 	});
  	}
  }

}

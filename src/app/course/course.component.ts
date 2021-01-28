import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from './courses.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
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
export class CourseComponent implements OnInit {
  loading;
  course;

  editMode = false;
  editForm: FormGroup;

  errors;
  errorState = 'hidden';

  constructor(private route: ActivatedRoute,
  			  private router: Router,
  			  private courseService: CoursesService) { }

  ngOnInit() {
  	this.editForm = new FormGroup({
  		'title': new FormControl('', [Validators.required]),
  		'description': new FormControl('', [Validators.required]),
  		'key': new FormControl('', [Validators.required])
  	});

  	this.loading = true;
  	this.route.params.subscribe(result => {
  		this.courseService.getCourse({id: result['id']}).subscribe(result => {
  			this.course = result;
  			this.courseService.courseId = this.course._id;
  			this.loading = false;
  		}, error => { 
  			let err;
  			if (error.status === 500) {
  				err = "Internal Server error, please try later"
  			} else {
  				err = error;
  			}
  			this.courseService.sendError(err);
  			this.router.navigate(['/']);
  		});
  	});
  }

  updateCourse() {
  	const title = this.editForm.value.title;
  	const description = this.editForm.value.description;
  	const key = this.editForm.value.key;
  	if (title === this.course.title &&
  		description === this.course.description &&
  		key === this.course.key) {
  		this.showError("You haven't changed anything");
  	} else {
  		this.courseService.editCourse({
  			id: this.course._id, 
  			title: title, 
  			description: description,
  			key: key, 
  			teacherId: localStorage.getItem('userId')}).subscribe(result => {
  				this.course.title = title;
  				this.course.description = description;
  				this.editMode = false;
  			}, error => {
		  		this.showError(error);
  			});
  	}
  }

  switchToEditMode() {
  	this.editMode = !this.editMode;
  	if (this.editMode === true) {
  		this.editForm.patchValue({
  			title: this.course.title,
  			description: this.course.description,
  			key: this.course.key
  		});
  	}
  }

  showError(value) {
  	this.errors = [{msg: value}];
	this.errorState = 'shown';
	setTimeout(() => {
		this.errorState = 'hidden';
	}, 2000);
  }

}

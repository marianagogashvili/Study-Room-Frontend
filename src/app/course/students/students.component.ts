import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {
  // loading;
  studentsSub;
  courseId;
  students;
  crossIcon = faTimesCircle;

  constructor(private courseService: CoursesService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.studentsSub = this.courseService.oldStudents.subscribe(students => {
  		this.students = students;
  	})
  	// this.loading = true;
  	this.route.parent.params.subscribe(params => {
  		this.courseService.getStudentsOfCourse({id: params['id']})
  			.subscribe((course: {_id: string, students}) => {
  				this.courseId = course._id
  				this.students = course.students;
  				
  				this.courseService.sendStudentsToSelf(this.students);
  				// this.loading = false;
  				console.log(this.students);
  			})
  	});
  	
  }

  removeStudent(student) {
  	this.courseService.deleteStudentFromCourse(
  		{studentId: student._id, courseId: this.courseId})
  		.subscribe(result => {
  			console.log(result);
  	});
  }

  ngOnDestroy() {
  	console.log('use');
  	this.studentsSub.unsubscribe();
  }
}

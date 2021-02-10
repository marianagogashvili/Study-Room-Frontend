import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({providedIn: 'root'})
export class CoursesService {
	constructor(private http: HttpClient) {
		this.checkType();
	}
	assignmentMode = new EventEmitter();
	postMode = new EventEmitter();

	// newAssignment = new Subject<any>();
	// newPost = new Subject<any>();
	feedValue = new Subject<any>(); 

	error = new BehaviorSubject<string>(null);
	oldStudents = new BehaviorSubject<any>(null);
	userType = new BehaviorSubject<any>(null);
	allowedUser = new BehaviorSubject<any>(null);

	courseId;

	checkType() {
		const decodedToken: {type} = jwt_decode(localStorage.getItem('token'));
		this.userType.next(decodedToken.type);  
	}

	getFeed(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/getFeed', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			}).pipe(catchError(error => {
				return throwError(error.error);
			}));
	}

	getCourse(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/getCourseTeacher', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			}).pipe(catchError(error => {
				return throwError(error.error);
			}));
	}

	editCourse(param: Params) {
		return this.http.put(
			'http://localhost:8000/course/editCourse', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			}).pipe(catchError(error => {
				return throwError(error.error);
			}));
	}

	getStudentsOfCourse(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/getStudentsOfCourse', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	deleteStudentFromCourse(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/deleteStudentFromCourse', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	findStudents(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/findStudentsByParams', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	addStudentsToCourse(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/addStudents', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	deleteAllStudents(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/deleteStudents', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	deleteCourse(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/deleteCourse', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	showAssignment(val) {
		this.assignmentMode.emit(val);
	}

	showPost(val) {
		this.postMode.emit(val);
	}

	sendNewFeedPost(val) {
		this.feedValue.next(val);
	}

	sendAllowedUser(type) {
		this.allowedUser.next(type);
	}

	// sendCourse(course) {
	// 	this.currentCourse.next(course);
	// }

	// sendNewAssignment(assignment) {
	// 	this.newAssignment.next(assignment);
	// }

	// sendNewPost(post) {
	// 	this.newPost.next(post);
	// }


	getGroups() {
		return this.http.get('http://localhost:8000/group/getGroups');
	}

	sendStudentsToSelf(students) {
		this.oldStudents.next(students);
	}

	sendError(err) {
		this.error.next(err);
	}
}
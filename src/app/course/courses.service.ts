import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CoursesService {
	constructor(private http: HttpClient) {}
	error = new BehaviorSubject<string>(null);
	oldStudents = new BehaviorSubject<string>(null);


	getCourse(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/getCourseTeacher', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
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

	sendStudentsToSelf(students) {
		this.oldStudents.next(students);
	}

	sendError(err) {
		this.error.next(err);
	}
}